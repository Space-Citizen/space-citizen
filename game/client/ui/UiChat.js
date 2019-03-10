
// Chat

class UiChat extends BaseUi {

    onInit() {
        // init
        this.target = null;
        this.game = this.state;
        this.connected = false;

        // Chat input
        this.chat_pos = { x: 0, y: canvas.height - 200, width: 150, height: 200 };
        this.onMessageSubmit.bind(this);
        this.chatInput = new CanvasInput({
            canvas: canvas,
            fontSize: 12,
            fontFamily: 'Arial',
            fontColor: '#fff',
            fontWeight: 'bold',
            width: this.chat_pos.width,
            y: this.chat_pos.y + this.chat_pos.height - 30,
            x: this.chat_pos.x,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            backgroundColor: "#000",
            borderRadius: 3,
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Enter message here...',
            onsubmit: (e, input) => { this.onMessageSubmit(input) }
        });

        this.messages = [];

        // Socket
        this.socket = io.connect(":4001");

        // Receivers
        this.socket.on('message:authenticate:response', result => {
            console.log(result);
        });

        this.socket.on('message:receive:ingame', result => {
            // If there is too much messages, remove the oldest
            if (this.messages.length > 10)
                this.messages.shift();
            this.messages.push({ username: result.sender_username, content: result.content });
        });
    }

    onMessageSubmit(input) {
        const message = input.value();

        if (message.length === 0 || !this.socket || !this.game.user_token)
            return;
        // Send message
        this.socket.emit('message:send:ingame', {
            message: message,
            token: this.game.user_token
        })
        input.value("");
    }

    onMouseLeftClick() {
        if (mouse.x >= this.chat_pos.x && mouse.y >= this.chat_pos.y
            && mouse.x <= this.chat_pos.x + this.chat_pos.width && mouse.y <= this.chat_pos.y + this.chat_pos.height) {
            return (true);
        }
        return (false);
    }

    onMouseRightClick() {
    }

    displayMessages() {
        context.font = "15px Arial";
        context.textAlign = "left";
        this.messages.map((message, index) => {
            var text_to_display = message.username + ": " + message.content;
            context.strokeText(text_to_display,
                this.chat_pos.x + 5,
                this.chat_pos.y + ((index + 1) * 15));
        });
    }

    displayBackground() {
        context.fillStyle = "#333";
        context.fillRect(this.chat_pos.x, this.chat_pos.y, this.chat_pos.width + 20, this.chat_pos.height);
    }

    onUpdate(time_elapsed) {
        // Authenticate to the message server
        if (!this.connected && this.game.user_token) {
            this.socket.emit('message:authenticate', {
                token: this.game.user_token
            });
            this.connected = true;
        }
        this.displayBackground();
        this.chatInput.render();
        this.displayMessages();
    }
}
