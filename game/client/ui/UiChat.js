
// Chat

class UiChat extends BaseUi {

    onInit() {
        // init
        this.target = null;
        this.game = this.state;
        this.connected = false;

        // Chat input
        // Chat contants
        this.chat_pos = { x: 0, y: canvas.height - 200, width: 250, height: 200 };
        this.input_height = 30;
        this.charsPerLine = 33;
        this.line_height = 15;
        this.max_lines = 10;
        this.max_message_length = this.charsPerLine * 5; // 5 lines maximum
        this.onMessageSubmit.bind(this);
        this.chatInput = new CanvasInput({
            canvas: canvas,
            fontSize: 12,
            fontFamily: 'Arial',
            fontColor: '#fff',
            fontWeight: 'bold',
            width: this.chat_pos.width,
            y: this.chat_pos.y + this.chat_pos.height - this.input_height,
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

        if (message.length === 0 || message.length > this.max_message_length
            || !this.socket || !this.game.user_token)
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
    }

    onMouseRightClick() {
    }

    displayMessages() {
        var lines_to_display = [];
        // Get all messages in line, if a message is too long he will be cut in multiple lines
        this.messages.map((message) => {
            var text_to_display = message.username + ": " + message.content;
            var line = "";
            for (var i = 0; i < text_to_display.length; i++) {
                line += text_to_display[i];
                if (i > 0 && i % this.charsPerLine === 0) {
                    lines_to_display.push(line)
                    line = "";
                }
            }
            if (line.length > 0)
                lines_to_display.push(line);
        });

        // Remove exessive lines
        if (lines_to_display.length > this.max_lines)
            lines_to_display = lines_to_display.splice(lines_to_display.length - 10, lines_to_display.length - 1);
        // Display
        context.font = "15px Arial";
        context.textAlign = "left";
        lines_to_display.map((line, index) => {
            context.strokeText(line,
                this.chat_pos.x + 5,
                this.chat_pos.y + ((index + 1) * this.line_height));
        })
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
