# Docker Puppeteer Example

Html-pdf files converter based on Puppeteer docker image, resulted pdf files are placed in local `./data` directory.

Note:

Css, images and static files can be used if properly referenced in html document: File [Uri Scheme and Relative Files](https://stackoverflow.com/questions/7857416/file-uri-scheme-and-relative-files)

## Running

```shell
# Clone
git clone git@github.com:aimestereo/pdfer.git
cd pdfer

# Build pdfer
docker build . -t pdfer

# check directory that has example data/example.html
ls data/

# Run converter over `data` directory to convert all html files to pdf
docker run --rm -v $(pwd)/data:/data pdfer --debug /data
# or to process single file
docker run --rm -v $(pwd)/data:/data pdfer --debug /data/example.html

# See the pdf that was generated
ls data/
```

Note: it's possible to run locally without using docker but it's not recommended and you will need to install Puppeteer yourself.
