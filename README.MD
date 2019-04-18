# Samsung Smart-TV control nodes for Node-RED

Works with latest Samsung Smart-TV models

## Installation

Requires Node v9 or above

npm i node-red-contrib-samsung-tv-mk

## Usage

1. Configure TV IP in Config node
2. Configure send command in Send node or via input payload
3. On first run grant access permission in TV
4. Check node-red console and copy message.data.token
5. Paste token value to config node token field, save and redeploy

## Roadmap

1. Capture and store token automatically on the first run

## Credits

Built on top of https://github.com/Toxblh/samsung-tv-remote