class TheRepublicApp {
    constructor() {
        this.isModernMode = true;
        this.currentBook = null;
        this.userScrolledUp = false;
        this.books = [];
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
            // Load Book 1
            const book1Response = await fetch('./data/book1.json');
            const book1Data = await book1Response.json();
            
            // Load other books
            const booksResponse = await fetch('./data/books.json');
            const otherBooks = await booksResponse.json();
            
            // Combine all books
            this.books = [book1Data, ...otherBooks];
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
            const isAvailable = book.id === 1;
            
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
        const displayData = this.getCurrentBookData(book);
        document.getElementById('chat-title').textContent = displayData.title;
        this.switchView('chat-view');
        this.userScrolledUp = false; // Reset scroll state
        this.setupScrollListener();
        this.startMessages(displayData.messages);
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
            
            // Pause before next
            if (i < messages.length - 1) {
                await this.delay(this.getPauseTime());
            }
        }
    }

    addMessage(message) {
        const container = document.getElementById('messages-container');
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.isSocrates ? 'socrates' : 'other'}`;
        
        messageEl.innerHTML = `
            <div>
                <div class="speaker-name">${message.speaker}</div>
                <div class="message-bubble">${message.text}</div>
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
        return Math.max(800, Math.min(6000, ms));
    }

    getThinkingTime(length) {
        // Socrates thinks faster but still needs time for complex thoughts
        const speed = 80 + Math.random() * 40; // slightly faster than typing
        const ms = (length / speed) * 60000;
        return Math.max(600, Math.min(4000, ms)); // shorter range, faster min/max
    }

    getPauseTime() {
        return (500 + Math.random() * 1500) * 0.75; // 25% shorter
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
    }

    bindEvents() {
        document.getElementById('back-btn').addEventListener('click', () => {
            this.switchView('conversation-list');
        });
        
        document.getElementById('translation-toggle').addEventListener('click', () => {
            this.toggleMode();
        });
    }
}

// Start app
document.addEventListener('DOMContentLoaded', () => {
    new TheRepublicApp();
});