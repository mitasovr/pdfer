#!/bin/bash


PDFER="npm run pdfer --silent"


_DEBUG="off"
function DEBUG() {
    [ "$_DEBUG" == "on" ] &&  $@
}


function main() {
    shopt -s nullglob
    FILES=${SHARED_DIR}/*.html

    DEBUG echo "Converting all html files to pdf in ${SHARED_DIR}:"
    DEBUG ls -A1 ${FILES}

    for in_file in ${FILES}
    do
      out_file="${in_file%.*}.pdf"
      cmd="${PDFER} -- ${in_file} ${out_file}"
      DEBUG echo "${cmd}"
      ${cmd}
    done
}


usage()
{
cat << EOF



NAME
       $0 - Entrypoint of pdfer

SYNOPSIS
       $0 [OPTION]... DIRECTORY

DESCRIPTION:
       Convert all html files to pdf in DIRECTORY

       --debug turn on debug logging

       -h, --help display this help and exit



EOF
}


if [ -x "$(command -v $1)" ]; then
  echo 'First argument is executable, skipping entrypoint'
  exec $@
  exit 0
fi


SHARED_DIR=""

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
if [ ! -d "${SHARED_DIR}" ]; then
    echo "Positional argument DIRECTORY should be an existing directory, received: \"${SHARED_DIR}\"" >&2
    usage
    exit 1
fi

main
