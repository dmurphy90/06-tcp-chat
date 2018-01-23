**FUNCTIONALITY**
Connect to a chat room with friends by connecting to their IP address and specified port.
Mac: nc ipaddress port (example: nc 123.45.6.789 3000)
Windows: telnet ipaddress port (example: telnet 123.45.6.789 3000)

Key Commands:

/quit - will disconnect the user from the chat
/list - will print out all of the users currently connected to the chat server
/dm [user] - used to send a private message directly to the user specified, an example would be "/dm tim hey what's up"
/nickname - allows the user to set their nickname to a different nickname, nickname must be all one word

How it works:

When a user connects an object is constructed right then and there with their socket, a randomly generated username and randomly generated nickname. Anything the user has typed into the window will be examined and looking for instances of key commands executing any key commands detected. Otherwise the message will be broadcasted to the whole channel.