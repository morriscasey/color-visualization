const {Color} = require('./Model/ColorModel');

const ColorQuantization = {
    ExtractPixelsFrom: function(byteArray) {
        let newColorCollection = [];
            for (let i=0; i < byteArray.length;i+=3) {
                let color = new Color(byteArray[i], byteArray[i+1], byteArray[i+2]);
                newColorCollection.push(color);
            }
            return newColorCollection;
    },
    SortPixelsByColorRange : function(collectionOfPixels, longestDimension) {
        let sortedPixel = collectionOfPixels;
    
        sortedPixel.sort((firstPixel, secondPixel) => {
            return firstPixel[longestDimension] - secondPixel[longestDimension]
        });
    
        return sortedPixel;
    },
    DetermineTheLongestDimension : function(collectionOfPixels) {
        let redDimension = [];
        let greenDimension = [];
        let blueRange = [];
        for(let i=0; i < collectionOfPixels.length; i++) {
            redDimension[i] = collectionOfPixels[i].Red;
            greenDimension[i] = collectionOfPixels[i].Green;
            blueRange[i] = collectionOfPixels[i].Blue;
        }

        redDimension.sort((firstValue, secondValue) => {
            firstValue - secondValue;
        });
        greenDimension.sort((firstValue, secondValue) => {
            firstValue - secondValue;
        });
        blueRange.sort((firstValue, secondValue) => {
            firstValue - secondValue;
        });

        let red = redDimension[redDimension.length-1] - redDimension[0];
        let green = greenDimension[greenDimension.length-1] = greenDimension[0];
        let blue = blueRange[blueRange.length-1] = blueRange[0];
        let colorName = ""
        let topRange = -1;
        if(red >= topRange) {
            topRange = red;
            colorName = "Red"
        }
        if(green >= topRange) {
            topRange = green;
            colorName = "Green";
        }
        if(blue >= topRange) {
            topRange = blue;
            colorName = "Blue"
        }

        return colorName;
    },
    FindMedianOfACollection: function(collectionOfPixels, nameOfLongestDimension) {
        let medianIndex = (collectionOfPixels.length - 1) / 2;
    
        // Return unexpected index
        if(medianIndex < 0) {
            return -1;
        }
        // if index length is even, median value is between two indexs
        if(medianIndex % 1 == 0.5) {
            let indexBeforeMedianValue = Math.floor(medianIndex);
            let indexAfterMedianValue = indexBeforeMedianValue + 1;
    
            return (collectionOfPixels[indexBeforeMedianValue][nameOfLongestDimension] + collectionOfPixels[indexAfterMedianValue][nameOfLongestDimension])/2;
        } else {
            return collectionOfPixels[medianIndex][nameOfLongestDimension];
        }
    },
    SplitCollectionByMedian: function(collectionOfPixels, medianValue, nameOfLongestDimension) {
        let beforeMedian = [];
        let afterMedian = [];
    
        beforeMedian = collectionOfPixels.filter(color => {return color[nameOfLongestDimension] < medianValue });
        afterMedian = collectionOfPixels.filter(color => {return color[nameOfLongestDimension] >= medianValue});
    
        return [beforeMedian, afterMedian];
    }
}

module.exports = {ColorQuantization};