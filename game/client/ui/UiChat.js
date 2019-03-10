// Chat

class UiChat extends BaseUi {

    onInit() {
        // init
        this.target = null;
        this.game = this.state;
        this.connected = false;

        // Chat constants
        this.chat_size = { width: convertPercentToScreen(20), height: convertPercentToScreen(13) };
        this.chat_pos = { x: 0, y: canvas.height - this.chat_size.height };

        // Font size is the chat height / 15
        this.font_size = this.chat_size.height / 15;
        // The input bar height is 1/5 of the chat height
        this.input_height = this.chat_size.height / 5;
        // Line height is the font size + a margin of 1 px
        this.line_height = this.font_size + 1;
        // maximum lines is the height of the chat - the height of the input bar / the height of a line. 
        this.max_lines = Math.floor((this.chat_size.height - this.input_height) / this.line_height);
        // Number of chars per line depends on the font size and the chat width
        this.chars_per_line = Math.round(this.chat_size.width / this.font_size);
        // Number of characters max per message: 5 lines
        this.max_message_length = this.chars_per_line * 5;

        // Create the input field
        this.chatInput = new CanvasInput({
            canvas: canvas,
            fontSize: this.font_size,
            fontFamily: 'monospace',
            fontColor: '#fff',
            fontWeight: 'bold',
            width: this.chat_size.width,
            height: this.input_height,
            y: this.chat_pos.y + this.chat_size.height - this.input_height,
            x: this.chat_pos.x,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            backgroundColor: "#000",
            borderRadius: 3,
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Enter a message here...',
            onsubmit: (e, input) => { this.onMessageSubmit(input) },
            onkeydown: (e, input) => { this.onKeyDown(input) }
        });

        // Message list
        this.messages = [];

        // Socket
        this.socket = io.connect(Constants.CHAT_PORT);

        // Receive a message
        this.socket.on('message:receive:ingame', result => {
            // If there is too much messages, remove the oldest
            if (this.messages.length > this.max_lines)
                this.messages.shift();
            // add the new message to the list
            this.messages.push({ username: result.sender_username, content: result.content });
        });
    }

    onKeyDown(input) {
        // get the chat input 
        var input_content = input.value();
        // If the input has too much characters
        if (input_content.length > this.max_message_length) {
            // Remove the last character
            input.value(input_content.substr(0, input_content.length - 1));
        }
    }

    onMessageSubmit(input) {
        const message = input.value();

        // If the message is too long, too short or there is no socket/token
        if (message.length === 0 || message.length > this.max_message_length
            || !this.socket || !this.game.user_token)
            return;
        // Send message
        this.socket.emit('message:send:ingame', {
            message: message,
            token: this.game.user_token
        })
        // Clear the input field
        input.value("");
    }

    onMouseLeftClick() {
        // check if the user click in the chat box
        if (mouse.x >= this.chat_pos.x && mouse.y >= this.chat_pos.y
            && mouse.x <= this.chat_pos.x + this.chat_size.width && mouse.y <= this.chat_pos.y + this.chat_size.height) {
            return (true);
        }
    }

    onMouseRightClick() {
    }

    // Split a message to an array every {chars_per_line} characters
    splitStringByLength(string, chars_per_line) {
        var result = [];

        var line = "";
        // for each char in the string
        for (var i = 0; i < string.length; i++) {
            // Add the char to the current line
            if (i > 0 && i % chars_per_line === 0) {
                result.push(line);
                line = "";
            }
            line += string[i];
        }
        // If there is an incomplet line
        if (line.length > 0)
            result.push(line);
        return (result);
    }

    splitMessagesInLines(messages, chars_per_line) {
        var lines_to_display = [];
        // Get all messages in line, if a message is too long he will be cut in multiple lines
        messages.forEach((message) => {
            // Create message to display
            var text = message.username + ": " + message.content;
            // If the message is too long to be displayed
            if (text.length > chars_per_line) {
                // Split the message in lines
                lines_to_display = lines_to_display.concat(this.splitStringByLength(text, chars_per_line));
            }
            else
                lines_to_display.push(text);
        });
        return (lines_to_display);
    }

    displayMessages() {
        // Split message into lines 
        var lines_to_display = this.splitMessagesInLines(this.messages, this.chars_per_line);
        const x_padding = 5;
        // Remove exessive lines
        if (lines_to_display.length > this.max_lines) {
            // remove the first lines
            lines_to_display = lines_to_display.splice(
                lines_to_display.length - this.max_lines,
                lines_to_display.length);
        }

        // Display
        // Configure font size and color
        context.font = this.font_size + "px monospace";
        context.textAlign = "left";
        context.fillStyle = "white";
        // for each line
        lines_to_display.map((line, index) => {
            // Draw a line of text
            context.fillText(line,
                this.chat_pos.x + x_padding,
                this.chat_pos.y + ((index + 1) * this.line_height));
        })
    }

    displayBackground() {
        // Used so the chat box has the same size as the input
        const leftMargin = 20;
        // grey
        context.fillStyle = "#333";
        // Create background rectangle
        context.fillRect(this.chat_pos.x, this.chat_pos.y, this.chat_size.width + leftMargin, this.chat_size.height);
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
