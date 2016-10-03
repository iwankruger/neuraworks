#Requires
Node.js, NPM and MongoDB

#Install Node.js and NPM (follow same instructions to update node and npm)
1. Go to http://nodejs.org and download to latest LTS version (ie. download v4.5.0 LTS)
2. Use installer to install node.js
3. Check node and npm installation.  In the terminal type the following: <br />
$node -v <br />
v4.5.0 <br />
4npm -v <br />
2.15.9 <br />

#Install Mongodb
1. Go to https://www.mongodb.org then download and install MongoDB as per the instruction given there.
2. Create a folder named mongodb on your computer and create a subfolder under it named data.
3. Move to the mongodb folder and then start the MongoDB server by typing rhe following at the prompt:<br />
$mongod --dbpath=data <br />

#Run the project
1. In a terminal go to the test1 folder in this project and then
2. Install project dependencies <br />
$npm install
3. Start server <br />
$npm start <br />
4. In a browser go to <br />
http://localhost:3000/ <br />

#Screenshot of program 1, upload user information
![alt text](/user_program.PNG)

#Screenshot of program2, csv test program
![alt text](/csv_program.PNG)



