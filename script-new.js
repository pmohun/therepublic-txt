// Original data
const originalBooks = [
    {
        id: 1,
        title: "Book I: What is Justice?",
        preview: "Polemarchus: I perceive, Socrates, that you and our companion are already on your way to the city.",
        messages: [
            { speaker: "Polemarchus", text: "I perceive, Socrates, that you and our companion are already on your way to the city.", isSocrates: false },
            { speaker: "Socrates", text: "You are not far wrong.", isSocrates: true },
            { speaker: "Polemarchus", text: "But do you see how many we are? And are you stronger than all these? For if not, you will have to remain where you are.", isSocrates: false },
            { speaker: "Socrates", text: "May there not be the alternative that we may persuade you to let us go?", isSocrates: true },
            { speaker: "Polemarchus", text: "But can you persuade us, if we refuse to listen to you?", isSocrates: false },
            { speaker: "Glaucon", text: "Certainly not.", isSocrates: false },
            { speaker: "Polemarchus", text: "Then we are not going to listen; of that you may be assured.", isSocrates: false }
        ]
    },
    {
        id: 2,
        title: "Book II: The Ring of Gyges",
        preview: "Glaucon: Let me tell you a story about a magic ring...",
        messages: []
    },
    {
        id: 3,
        title: "Book III: The Noble Lie",
        preview: "Socrates: Sometimes rulers must tell stories for the good of the state...",
        messages: []
    }
];

// Modern translations
const modernBooks = [
    {
        id: 1,
        title: "Book I: What Even Is Justice?",
        preview: "Polemarchus: Yo Socrates, I see you and your friend are trying to head back to the city.",
        messages: [
            { speaker: "Polemarchus", text: "Yo Socrates, I see you and your friend are trying to head back to the city.", isSocrates: false },
            { speaker: "Socrates", text: "You're not wrong.", isSocrates: true },
            { speaker: "Polemarchus", text: "But look how many of us there are! You think you can take all of us? If not, you're staying put.", isSocrates: false },
            { speaker: "Socrates", text: "What if we just... talked you into letting us go?", isSocrates: true },
            { speaker: "Polemarchus", text: "How are you gonna convince us if we're not even listening?", isSocrates: false },
            { speaker: "Glaucon", text: "Fair point.", isSocrates: false },
            { speaker: "Polemarchus", text: "Then we're definitely not listening. That's final.", isSocrates: false },
            { speaker: "Adeimantus", text: "Has anyone told you about the torch relay race on horseback tonight? It's for the goddess.", isSocrates: false },
            { speaker: "Socrates", text: "On horses?! That's new. So riders will pass torches to each other during the race?", isSocrates: true },
            { speaker: "Polemarchus", text: "Yeah, and there's going to be this whole festival at night that you need to see. We'll eat dinner and then go check it out. There'll be tons of young people there and we can have some good conversations. Come on, don't be difficult.", isSocrates: false },
            { speaker: "Glaucon", text: "I guess since you're insisting, we have to stay.", isSocrates: false },
            { speaker: "Socrates", text: "Alright then.", isSocrates: true },
            { speaker: "Cephalus", text: "Socrates, you don't visit me nearly enough! If I could still make it to the city easily, I wouldn't be asking you to come out here. But at my age, it's hard for me to get around, so you should come to the port more often.", isSocrates: false },
            { speaker: "Cephalus", text: "Here's the thing - as physical pleasures fade away, I find myself enjoying conversation more and more. So please don't say no, make yourself at home here with these young guys. We're old friends, you'll be totally comfortable with us.", isSocrates: false },
            { speaker: "Socrates", text: "Honestly, there's nothing I like more than talking with older people. I think of you guys as travelers who've been down a road I might have to take someday. I want to know - is it smooth sailing or is it rough?", isSocrates: true },
            { speaker: "Socrates", text: "So I'd love to ask you this, since you're at what poets call the 'threshold of old age' - is life harder toward the end, or what's your take on it?", isSocrates: true },
            { speaker: "Cephalus", text: "I'll tell you how I see it. People my age hang out together - birds of a feather, you know? And when we get together, everyone's complaining: 'I can't eat, I can't drink, the good times are over, life sucks now.'", isSocrates: false },
            { speaker: "Cephalus", text: "Some people blame their families for treating them badly and go on about how terrible old age is. But I think they're blaming the wrong thing.", isSocrates: false },
            { speaker: "Cephalus", text: "If old age was really the problem, then I'd be miserable too, and so would every other old person. But that's not my experience, and it's not what I've seen with others either.", isSocrates: false },
            { speaker: "Socrates", text: "Okay Cephalus, but I think most people aren't buying what you're selling. They think old age is easy for you not because you're chill, but because you're rich. Everyone knows money makes things easier.", isSocrates: true },
            { speaker: "Cephalus", text: "You're right, they don't buy it. And there's some truth to what they're saying, just not as much as they think. It's like what Themistocles said to that guy who was talking trash - fame depends on circumstances, not just personal merit.", isSocrates: false },
            { speaker: "Socrates", text: "Can I ask - did you inherit your money or make it yourself?", isSocrates: true },
            { speaker: "Cephalus", text: "Made it! Want to know how much? I'm basically the middle ground between my grandfather and father when it comes to money. My grandfather doubled or tripled what he inherited. But my dad blew through most of it. I'll be happy if I can leave my sons at least what I got, maybe a little more.", isSocrates: false },
            { speaker: "Socrates", text: "That's why I asked - I noticed you don't seem that attached to money. That's usually more of a thing with people who inherited it rather than earned it. People who build wealth love it like artists love their work, plus they love it for what it can do.", isSocrates: true },
            { speaker: "Socrates", text: "So what's the biggest benefit you've gotten from being wealthy?", isSocrates: true },
            { speaker: "Cephalus", text: "Something most people probably wouldn't believe. Here's the thing - when someone thinks they're about to die, they start worrying about stuff they never cared about before. All those stories about the afterlife and punishment? They used to be funny, but now they're terrifying.", isSocrates: false },
            { speaker: "Cephalus", text: "The great thing about being rich - at least for a good person - is that you never had to screw anyone over. So when you die, you're not stressed about owing money to people or the gods.", isSocrates: false },
            { speaker: "Socrates", text: "Well said, Cephalus. But about justice - is it really just 'tell the truth and pay your debts'? That's it? Even that has exceptions, right?", isSocrates: true },
            { speaker: "Socrates", text: "Like, what if a friend gave you their weapons when they were sane, but then they went crazy and asked for them back? You wouldn't give them back, right? And you probably wouldn't be totally honest with someone who's lost their mind either.", isSocrates: true },
            { speaker: "Cephalus", text: "You're absolutely right.", isSocrates: false },
            { speaker: "Socrates", text: "So 'tell the truth and pay your debts' isn't really a complete definition of justice.", isSocrates: true },
            { speaker: "Polemarchus", text: "Actually, Socrates, that's totally right - if we're going with what Simonides said.", isSocrates: false },
            { speaker: "Cephalus", text: "Sorry, I gotta go handle the religious stuff. I'm passing this argument off to Polemarchus and everyone else.", isSocrates: false },
            { speaker: "Socrates", text: "Isn't Polemarchus your heir anyway?", isSocrates: true },
            { speaker: "Cephalus", text: "Absolutely.", isSocrates: false },
            { speaker: "Socrates", text: "Alright, heir to the argument, what did Simonides actually say about justice? You seem to think he was right.", isSocrates: true },
            { speaker: "Polemarchus", text: "He said paying back what you owe is justice, and I think he's onto something.", isSocrates: false },
            { speaker: "Socrates", text: "Look, I don't want to doubt such a wise guy, but I'm not getting his meaning. He obviously doesn't mean what we just talked about - that you should return weapons to someone who's mentally unstable, even though technically that's a debt.", isSocrates: true },
            { speaker: "Polemarchus", text: "True.", isSocrates: false },
            { speaker: "Socrates", text: "So when someone's not in their right mind, I shouldn't give them back their stuff?", isSocrates: true },
            { speaker: "Polemarchus", text: "Definitely not.", isSocrates: false },
            { speaker: "Socrates", text: "So Simonides didn't mean that case when he said paying debts is justice?", isSocrates: true },
            { speaker: "Polemarchus", text: "Of course not. He thinks friends should always help friends and never harm them.", isSocrates: false },
            { speaker: "Socrates", text: "So you're saying that returning money that would hurt the person getting it back, if they're your friend, isn't really paying a debt - that's what you think he meant?", isSocrates: true },
            { speaker: "Polemarchus", text: "Exactly.", isSocrates: false },
            { speaker: "Socrates", text: "What about enemies? Should they get what we owe them too?", isSocrates: true },
            { speaker: "Polemarchus", text: "For sure, they should get what we owe them. And what we owe an enemy is what they deserve - which is basically harm.", isSocrates: false },
            { speaker: "Socrates", text: "So Simonides was being all poetic and mysterious about justice. He really meant that justice is giving everyone what they deserve, and he called that a 'debt.'", isSocrates: true },
            { speaker: "Polemarchus", text: "That must be what he meant.", isSocrates: false },
            { speaker: "Socrates", text: "Okay! So if we asked him what medicine gives people and who it gives it to, what would he say?", isSocrates: true },
            { speaker: "Polemarchus", text: "He'd say medicine gives drugs, food, and drinks to bodies.", isSocrates: false },
            { speaker: "Socrates", text: "And what does cooking give, and to what?", isSocrates: true },
            { speaker: "Polemarchus", text: "Seasoning to food.", isSocrates: false },
            { speaker: "Socrates", text: "And what does justice give, and to whom?", isSocrates: true },
            { speaker: "Polemarchus", text: "If we're following the same pattern, then justice gives good stuff to friends and bad stuff to enemies.", isSocrates: false },
            { speaker: "Socrates", text: "So that's what he meant?", isSocrates: true },
            { speaker: "Polemarchus", text: "I think so.", isSocrates: false },
            { speaker: "Socrates", text: "And who's best at helping friends and hurting enemies when they're sick?", isSocrates: true },
            { speaker: "Polemarchus", text: "A doctor.", isSocrates: false },
            { speaker: "Socrates", text: "Or when they're on a dangerous boat trip?", isSocrates: true },
            { speaker: "Polemarchus", text: "A ship captain.", isSocrates: false },
            { speaker: "Socrates", text: "So when would a just person be the best at helping friends and hurting enemies?", isSocrates: true },
            { speaker: "Polemarchus", text: "In war - fighting against enemies and teaming up with friends.", isSocrates: false },
            { speaker: "Socrates", text: "But when someone's healthy, they don't need a doctor, right?", isSocrates: true },
            { speaker: "Polemarchus", text: "Nope.", isSocrates: false },
            { speaker: "Socrates", text: "And when they're not on a ship, they don't need a captain?", isSocrates: true },
            { speaker: "Polemarchus", text: "Right.", isSocrates: false },
            { speaker: "Socrates", text: "So during peacetime, justice is useless?", isSocrates: true },
            { speaker: "Polemarchus", text: "I definitely don't think that.", isSocrates: false },
            { speaker: "Socrates", text: "You think justice is useful in peace AND war?", isSocrates: true },
            { speaker: "Polemarchus", text: "Yeah.", isSocrates: false },
            { speaker: "Socrates", text: "Like farming is useful for getting grain?", isSocrates: true },
            { speaker: "Polemarchus", text: "Yeah.", isSocrates: false },
            { speaker: "Socrates", text: "Or shoemaking is useful for getting shoes - that's what you mean?", isSocrates: true },
            { speaker: "Polemarchus", text: "Exactly.", isSocrates: false },
            { speaker: "Socrates", text: "So what's justice useful for getting during peacetime?", isSocrates: true },
            { speaker: "Polemarchus", text: "For contracts and deals, Socrates.", isSocrates: false },
            { speaker: "Socrates", text: "By contracts you mean partnerships?", isSocrates: true },
            { speaker: "Polemarchus", text: "Exactly.", isSocrates: false },
            { speaker: "Socrates", text: "But for playing checkers, would you rather partner with a just person or someone who's actually good at checkers?", isSocrates: true },
            { speaker: "Polemarchus", text: "The person who's good at checkers.", isSocrates: false },
            { speaker: "Socrates", text: "And for construction work, would you rather have a just person or an actual builder as your partner?", isSocrates: true },
            { speaker: "Polemarchus", text: "Definitely the builder.", isSocrates: false },
            { speaker: "Socrates", text: "So what kind of partnership would you prefer a just person over a musician, the way you'd prefer a musician over a just person for music?", isSocrates: true },
            { speaker: "Polemarchus", text: "Money partnerships.", isSocrates: false },
            { speaker: "Socrates", text: "Sure, but not for actually using money, right? Like, you wouldn't want a just person helping you buy or sell a horse - you'd want someone who knows about horses, wouldn't you?", isSocrates: true },
            { speaker: "Polemarchus", text: "Totally.", isSocrates: false },
            { speaker: "Socrates", text: "And for buying a ship, you'd want a shipbuilder or captain, right?", isSocrates: true },
            { speaker: "Polemarchus", text: "True.", isSocrates: false },
            { speaker: "Socrates", text: "So when would you prefer a just person for handling money?", isSocrates: true },
            { speaker: "Polemarchus", text: "When you want to keep it safe.", isSocrates: false },
            { speaker: "Socrates", text: "You mean when you're not using it, just storing it?", isSocrates: true },
            { speaker: "Polemarchus", text: "Exactly.", isSocrates: false },
            { speaker: "Socrates", text: "So justice is useful when money is useless?", isSocrates: true },
            { speaker: "Polemarchus", text: "That's what it sounds like.", isSocrates: false },
            { speaker: "Socrates", text: "And when you want to keep garden shears safe, justice is useful for individuals and society, but when you want to use them, you need a gardener?", isSocrates: true },
            { speaker: "Polemarchus", text: "Obviously.", isSocrates: false },
            { speaker: "Socrates", text: "And when you want to store a shield or guitar safely, justice is useful, but when you want to use them, you need a soldier or musician?", isSocrates: true },
            { speaker: "Polemarchus", text: "Definitely.", isSocrates: false },
            { speaker: "Socrates", text: "So with everything else - justice is useful when things are useless, and useless when things are useful?", isSocrates: true },
            { speaker: "Polemarchus", text: "That seems to be the logic.", isSocrates: false }
        ]
    },
    {
        id: 2,
        title: "Book II: The Ring Thing",
        preview: "Glaucon: OK so imagine you had this magic ring...",
        messages: []
    },
    {
        id: 3,
        title: "Book III: White Lies",
        preview: "Socrates: Sometimes leaders gotta tell stories to keep society together...",
        messages: []
    }
];

class TheRepublicApp {
    constructor() {
        this.isModernMode = true;
        this.currentBook = null;
        this.userScrolledUp = false;
        this.init();
    }

    init() {
        this.renderConversationList();
        this.bindEvents();
        this.updateToggleButton();
    }
    
    updateToggleButton() {
        const btn = document.getElementById('translation-toggle');
        btn.textContent = this.isModernMode ? 'Original' : 'Modern';
        btn.classList.toggle('active', this.isModernMode);
    }

    getCurrentBookSet() {
        return this.isModernMode ? modernBooks : originalBooks;
    }

    renderConversationList() {
        const container = document.querySelector('.conversations');
        container.innerHTML = '';

        const books = this.getCurrentBookSet();
        
        books.forEach(book => {
            const item = document.createElement('div');
            const isAvailable = book.id === 1;
            
            item.className = `conversation-item ${isAvailable ? '' : 'disabled'}`;
            
            item.innerHTML = `
                <div class="conversation-title">${book.title}</div>
                <div class="conversation-preview">${isAvailable ? book.preview : 'Coming soon...'}</div>
            `;
            
            if (isAvailable) {
                item.addEventListener('click', () => this.openChat(book));
            }
            
            container.appendChild(item);
        });
    }

    openChat(book) {
        this.currentBook = book;
        document.getElementById('chat-title').textContent = book.title;
        this.switchView('chat-view');
        this.userScrolledUp = false; // Reset scroll state
        this.setupScrollListener();
        this.startMessages(book.messages);
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