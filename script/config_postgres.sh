#!/usr/bin/env bash
# this script is used to install postgresql and make configuration on Ubuntu
# whereis psql
# psql: /usr/bin/psql /usr/share/man/man1/psql.1


# 20240712 - mahaiqing - first version
# 20240721 - mahaiqing - add clean database operation
# 20241119 - mahaiqing - change postgresql@XX-main.service to  postgresql.service

set -u
set -o pipefail

SCRIPT_PATH=$(cd "$(dirname "$0")" || exit ;pwd)
LOGFILE_PATH="$SCRIPT_PATH/../run/log"
LOGFILE_NAME="12-software-install-postgresql.log"
LOGFILE="$LOGFILE_PATH/$LOGFILE_NAME"

if [[ ! -d  "$LOGFILE_PATH" ]]
then
    mkdir -p "$LOGFILE_PATH"
    echo -e "creat directroy($LOGFILE_PATH) to save log($LOGFILE_NAME)  [$(date)] " | tee "$LOGFILE"
else
    echo "This is going to install postgresql service packages on host $(hostname) [$(date)] " | tee "$LOGFILE"
    echo "logfile: $LOGFILE " | tee -a "$LOGFILE"
fi

index=1
os_type=$(grep 'PRETTY_NAME=' /etc/os-release | cut -d '=' -f 2 | tr -d '"')
echo -e "\nstep $index -- install postgresql on ${os_type} " | tee -a "$LOGFILE"


index=$((index+1))
echo -e "\nstep $index -- check software expect installed or not " | tee -a "$LOGFILE"
if [[ -e /usr/bin/expect ]]
    then
    echo "--package expect has already installed." | tee -a "$LOGFILE"
elif [[ "$os_type" =~ "Ubuntu"  ]]
    then
    echo "This is going to install package(expect) on ${os_type}." | tee -a "$LOGFILE"
    sudo apt-get install -y expect
else
    echo  "You have to install package(expect) on ${os_type} manually." | tee -a "$LOGFILE"
    exit 1
fi


index=$((index+1)) 
echo -e "\nstep $index -- check software postgresql installed or not " | tee -a "$LOGFILE"
if [[ -e /usr/bin/psql ]]
    then
    echo "--package postgresql has already installed." | tee -a "$LOGFILE"
else
    echo  "You have to install package(postgresql ) on ${os_type} manually." | tee -a "$LOGFILE"
    exit 1
fi


function create_database_for_yeying() {
sudo su - postgres <<EOF
psql

CREATE USER yeying WITH PASSWORD 'yytest';

CREATE DATABASE yeying OWNER yeying;

GRANT ALL PRIVILEGES ON DATABASE yeying TO yeying;

\c yeying;

\i /tmp/yeying.sql

ALTER TABLE node_service OWNER TO yeying;

ALTER TABLE node_user OWNER TO yeying;

ALTER TABLE node_invitation OWNER TO yeying;

ALTER TABLE node_application OWNER TO yeying;

ALTER TABLE node_event OWNER TO yeying;

ALTER TABLE node_certificate OWNER TO yeying;

\q
exit
EOF
}

index=$((index+1)) 
echo -e  "\nstep $index -- make database configuration for yeying " | tee -a "$LOGFILE"
SQLFILE="$SCRIPT_PATH/../resource/db/ddl.sql"
if [[ -e /tmp/yeying.sql ]]
    then
    rm -f /tmp/yeying.sql
fi
cp -a "$SQLFILE" /tmp/yeying.sql
chmod 505 /tmp/yeying.sql

if [[ "$os_type" =~ "Ubuntu"  ]]
then
    sudo systemctl restart postgresql.service
fi

create_database_for_yeying

if [[ -e /tmp/yeying.sql ]]
    then
    rm -f /tmp/yeying.sql
fi
echo "This is end of install postgresql on host $(hostname) [$(date)] " | tee  -a "$LOGFILE"
