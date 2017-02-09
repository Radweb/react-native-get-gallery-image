## react-native-rw-get-gallery-image

Get an image and move it to a given directory. Useful for iOS and Android where the urls from the gallery are not file paths (`asset-library://` and `content://`)

## Installation

`npm i react-native-rw-get-gallery-image -- save`

or 

`yarn add react-native-rw-get-gallery-image`

then run

`react-native link`


## Example usage

```javascript
import RNGGI from 'react-native-rw-get-gallery-image'

const path = `some-url-from-the-gallery-or-camera-roll`

const movedImagePath = await RNGGI.moveFile(path, 'some-new-name', 'aDirectory')
```

