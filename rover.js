class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110; 
   }
   receiveMessage(message) {
     let response = {
      'message' : message.name,
      'results' : []
    }
    if (!message.commands || message.commands.length == 0) {
      return response;
    } 

    for (let i = 0; i < message.commands.length; i++) {
      let command = message.commands[i]
      if (command.commandType == 'MOVE') {
        if (this.mode == 'NORMAL') 
        { this.position = command.value;
          response.results.push({completed: true})
        } else {
        response.results.push({completed: false})
        }
        }
      if (command.commandType == "STATUS_CHECK") {
        let statusObject = {
          completed: true, 
          roverStatus: {
            mode: this.mode, 
            generatorWatts: this.generatorWatts, 
            position: this.position
          }
        }
        response.results.push(statusObject);
      }
      if (command.commandType == "MODE_CHANGE") {
        this.mode = command.value; 
        response.results.push({completed: true});
      }

    }
    return response; 
   }
}

module.exports = Rover;