# admin-console-backend

# Pre-requisites
## MySQL

### Ubuntu Linux
```
wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.15-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.15-1_all.deb
sudo apt-get update
sudo apt-get install mysql-server

Run the following to secure the installation.
sudo mysql_secure_installation

Update the rool user password after logging into mysql cli

sudo mysql

ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';

```

Once MySQL is installed, run the `camldbscript.sql` on MySQL to create the database and the tables.


## InfluxDB
wget -qO- https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/os-release
echo "deb https://repos.influxdata.com/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt-get update && sudo apt-get install influxdb
sudo service influxdb start


## Node.js and npm
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
```

# Steps to run it

```
git clone https://github.com/caml-dev/admin-console-backend.git
cd CamlBackend
npm install
node server.js
```
