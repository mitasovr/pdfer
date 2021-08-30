#!/bin/bash


PDFER="npm run pdfer --silent"


_DEBUG="off"
function DEBUG() {
    [ "$_DEBUG" == "on" ] &&  $@
}


function main() {
    cmd="${PDFER} -- ${SHARED_DIR}"
    DEBUG echo "${cmd}"
    ${cmd}
}


usage()
{
cat << EOF



NAME
       $0 - Entrypoint of pdfer

SYNOPSIS
       $0 [OPTION]... HTML FILE
       $0 [OPTION]... DIRECTORY

DESCRIPTION:
       Convert html file to pdf
       or all html files to pdf in DIRECTORY

       --debug turn on debug logging

       -h, --help display this help and exit



EOF
}


# check that contaner was run with command like /bin/bash
# to enter inside container in interactive mode
if [ -x "$(command -v $1 &> /dev/null)" ]; then
  echo 'First argument is executable, skipping entrypoint'
  exec $@
  exit 0
fi


while [ ! $# -eq 0 ]; do
    case "$1" in
        --debug)
            _DEBUG="on"
            ;;
        -h | --help)
            usage
            exit
            ;;
        -?*)
            printf 'WARN: Unknown option (ignored): %s\n' "$1" >&2
            ;;
        *)
            # Default case: No more options, so break out of the loop.
            break
            ;;
    esac
    shift
done


SHARED_DIR="$1"

main
