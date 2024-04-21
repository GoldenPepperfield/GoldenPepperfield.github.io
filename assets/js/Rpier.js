const exec = require('child_process').exec;

function getTemperature(callback) {
    exec("/opt/vc/bin/vcgencmd measure_temp", function(error, stdout, stderr) {
        if(error != null) {
            callback(error, null);
        } else {
            // Extract temperature from output
            const tempString = stdout.split('=')[1];
            const temp = parseFloat(tempString);
            callback(null, temp);
        }
    });
}

// Set interval to get temperature every 5 seconds
setInterval(function() {
    getTemperature(function(err, temp) {
        if(err) {
            console.error("Failed to get temperature:", err);
        } else {
            console.log("CPU Temperature is", temp, "°C");
        }
    });
}, 5000);