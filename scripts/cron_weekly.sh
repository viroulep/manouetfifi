#!/usr/bin/env bash

/home/fifi/manouetfifi/scripts/prod_cert.sh renew_cert
# Restarting nginx is necessary for the potential new certificate to be taken into account.
/usr/sbin/service nginx restart
