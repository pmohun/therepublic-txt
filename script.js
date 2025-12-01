class TheRepublicApp {
    constructor() {
        this.isModernMode = true;
        this.currentBook = null;
        this.userScrolledUp = false;
        this.books = [];
        this.skipToEnd = false;
        this.init();
    }

    async init() {
        await this.loadData();
        this.renderConversationList();
        this.bindEvents();
        this.updateToggleButton();
    }

    async loadData() {
        try {
            // Load all 10 books in parallel
            const bookPromises = [];
            for (let i = 1; i <= 10; i++) {
                bookPromises.push(
                    fetch(`./data/book${i}.json`).then(res => res.json())
                );
            }
            
            this.books = await Promise.all(bookPromises);
        } catch (error) {
            console.error('Error loading book data:', error);
            // Fallback to empty array if data fails to load
            this.books = [];
        }
    }
    
    updateToggleButton() {
        const btn = document.getElementById('translation-toggle');
        btn.textContent = this.isModernMode ? 'Original' : 'Modern';
        btn.classList.toggle('active', this.isModernMode);
    }

    getCurrentBookData(book) {
        const mode = this.isModernMode ? 'modern' : 'original';
        return book[mode];
    }

    renderConversationList() {
        const container = document.querySelector('.conversations');
        container.innerHTML = '';

        this.books.forEach(book => {
            const item = document.createElement('div');
            const isAvailable = book.id >= 1 && book.id <= 10;
            
            item.className = `conversation-item ${isAvailable ? '' : 'disabled'}`;
            
            const displayData = this.getCurrentBookData(book);
            
            item.innerHTML = `
                <div class="conversation-title">${displayData.title}</div>
                <div class="conversation-preview">${isAvailable ? displayData.preview : 'Coming soon...'}</div>
            `;
            
            if (isAvailable) {
                item.addEventListener('click', () => this.openChat(book));
            }
            
            container.appendChild(item);
        });
    }

    openChat(book) {
        this.currentBook = book;
        this.milestones = {}; // Reset reading progress milestones
        this.skipToEnd = false; // Reset skip state
        const displayData = this.getCurrentBookData(book);
        document.getElementById('chat-title').textContent = displayData.title;
        this.switchView('chat-view');
        this.userScrolledUp = false; // Reset scroll state
        this.setupScrollListener();
        this.startMessages(displayData.messages);
        
        // Track book opening in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'book_open', {
                'book_id': book.id,
                'book_title': displayData.title,
                'translation_mode': this.isModernMode ? 'modern' : 'original',
                'total_messages': displayData.messages.length
            });
        }
    }

    setupScrollListener() {
        const container = document.getElementById('messages-container');
        container.addEventListener('scroll', () => {
            this.checkScrollPosition();
        });
    }

    checkScrollPosition() {
        const container = document.getElementById('messages-container');
        const threshold = 50; // pixels from bottom
        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        
        this.userScrolledUp = distanceFromBottom > threshold;
    }

    isAtBottom() {
        return !this.userScrolledUp;
    }

    async startMessages(messages) {
        const container = document.getElementById('messages-container');
        container.innerHTML = '';

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            
            // If skipToEnd is triggered, load remaining messages immediately
            if (this.skipToEnd) {
                // Small delay to show loading state
                await this.delay(300);
                this.hideLoading();
                for (let j = i; j < messages.length; j++) {
                    this.addMessage(messages[j], true); // true = skip animation
                }
                this.showConversationEnded(true);
                this.scrollToTop();
                return; // Exit early, skip the completion tracking below
            }
            
            // Show typing for non-Socrates messages
            if (!message.isSocrates) {
                this.showTyping();
                await this.delay(this.getTypingTime(message.text.length));
                this.hideTyping();
            } else {
                // Socrates takes time to think before responding
                await this.delay(this.getThinkingTime(message.text.length));
            }
            
            // Add message
            this.addMessage(message);
            this.scrollToBottomIfNeeded();
            
            // Track reading progress milestones
            this.trackReadingProgress(i, messages.length);
            
            // Pause before next (based on message length for reading time)
            if (i < messages.length - 1) {
                await this.delay(this.getPauseTime(message.text.length));
            }
        }
        
        // Show end of conversation message
        this.showConversationEnded();
        this.scrollToBottomIfNeeded();
        
        // Track completion
        if (typeof gtag !== 'undefined' && this.currentBook) {
            gtag('event', 'book_completed', {
                'book_id': this.currentBook.id,
                'book_title': this.getCurrentBookData(this.currentBook).title,
                'translation_mode': this.isModernMode ? 'modern' : 'original',
                'total_messages': messages.length
            });
        }
    }

    showConversationEnded(skipAnimation = false) {
        const container = document.getElementById('messages-container');
        const endMessage = document.createElement('div');
        endMessage.className = `conversation-ended${skipAnimation ? ' no-animation' : ''}`;
        endMessage.textContent = 'Everyone has left the conversation';
        container.appendChild(endMessage);
    }

    addMessage(message, skipAnimation = false) {
        const container = document.getElementById('messages-container');
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.isSocrates ? 'socrates' : 'other'}`;
        
        messageEl.innerHTML = `
            <div>
                <div class="speaker-name${skipAnimation ? ' no-animation' : ''}">${message.speaker}</div>
                <div class="message-bubble${skipAnimation ? ' no-animation' : ''}">${message.text}</div>
            </div>
        `;
        
        container.appendChild(messageEl);
    }

    showTyping() {
        const container = document.getElementById('messages-container');
        const typing = document.createElement('div');
        typing.id = 'typing-indicator';
        typing.className = 'typing-indicator';
        
        typing.innerHTML = `
            <div class="typing-bubble">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        container.appendChild(typing);
        this.scrollToBottomIfNeeded();
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    getTypingTime(length) {
        const speed = 60 + Math.random() * 30; // chars per minute
        const ms = (length / speed) * 60000;
        return Math.max(480, Math.min(3600, ms)); // 40% faster
    }

    getThinkingTime(length) {
        // Socrates thinks faster but still needs time for complex thoughts
        const speed = 80 + Math.random() * 40; // slightly faster than typing
        const ms = (length / speed) * 60000;
        return Math.max(180, Math.min(1200, ms)) * 0.5; // 40% faster
    }

    getPauseTime(length) {
        // Base pause + additional time based on message length (reading time)
        const readingSpeed = 200 + Math.random() * 50; // chars per minute
        const readingTime = (length / readingSpeed) * 60000;
        const basePause = 200 + Math.random() * 300;
        return Math.max(300, Math.min(2400, basePause + readingTime));
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    scrollToTop() {
        const container = document.getElementById('messages-container');
        container.scrollTop = 0;
    }

    scrollToBottom() {
        const container = document.getElementById('messages-container');
        container.scrollTop = container.scrollHeight;
    }

    scrollToBottomIfNeeded() {
        if (this.isAtBottom()) {
            this.scrollToBottom();
        }
    }

    trackReadingProgress(messageIndex, totalMessages) {
        if (typeof gtag === 'undefined' || !this.currentBook) return;
        
        const progress = (messageIndex + 1) / totalMessages;
        const displayData = this.getCurrentBookData(this.currentBook);
        
        // Track reading milestones at 25%, 50%, 75%
        if (progress >= 0.25 && !this.milestones?.quarter) {
            this.milestones = this.milestones || {};
            this.milestones.quarter = true;
            gtag('event', 'book_progress', {
                'book_id': this.currentBook.id,
                'book_title': displayData.title,
                'progress': '25%',
                'translation_mode': this.isModernMode ? 'modern' : 'original'
            });
        }
        
        if (progress >= 0.50 && !this.milestones?.half) {
            this.milestones = this.milestones || {};
            this.milestones.half = true;
            gtag('event', 'book_progress', {
                'book_id': this.currentBook.id,
                'book_title': displayData.title,
                'progress': '50%',
                'translation_mode': this.isModernMode ? 'modern' : 'original'
            });
        }
        
        if (progress >= 0.75 && !this.milestones?.threeQuarters) {
            this.milestones = this.milestones || {};
            this.milestones.threeQuarters = true;
            gtag('event', 'book_progress', {
                'book_id': this.currentBook.id,
                'book_title': displayData.title,
                'progress': '75%',
                'translation_mode': this.isModernMode ? 'modern' : 'original'
            });
        }
    }

    switchView(viewName) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(viewName).classList.add('active');
    }

    toggleMode() {
        this.isModernMode = !this.isModernMode;
        this.updateToggleButton();
        this.renderConversationList();
        
        // Track translation mode toggle in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'translation_toggle', {
                'new_mode': this.isModernMode ? 'modern' : 'original'
            });
        }
    }

    seeAll() {
        this.skipToEnd = true;
        this.hideTyping(); // Remove any typing indicator
        this.showLoading();
    }

    showLoading() {
        const container = document.getElementById('messages-container');
        container.innerHTML = `
            <div id="loading-indicator" class="loading-indicator">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading messages...</div>
            </div>
        `;
    }

    hideLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) loading.remove();
    }

    bindEvents() {
        document.getElementById('back-btn').addEventListener('click', () => {
            this.switchView('conversation-list');
        });
        
        document.getElementById('translation-toggle').addEventListener('click', () => {
            this.toggleMode();
        });
        
        document.getElementById('see-all-btn').addEventListener('click', () => {
            this.seeAll();
        });
    }
}

// Start app
document.addEventListener('DOMContentLoaded', () => {
    new TheRepublicApp();
});