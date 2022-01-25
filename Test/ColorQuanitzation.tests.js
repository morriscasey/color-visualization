var assert = require('assert');
const {ColorQuantization} = require('../src/ColorQuantization');
const { Color } = require('../src/Model/ColorModel');

describe("ColorQuanization", function(){
    let byteArray = [255,15,200,255,250,3,10,111,0,245,20,112];
    describe("ExtractPixelsFrom(byteArray)", function(){
        it("returns a collection of pixels.", function(){
            let expectedCollection = [
                {
                    "Red": 255,
                    "Green":15,
                    "Blue": 200
                },
                {
                    "Red": 255,
                    "Green": 250,
                    "Blue": 3
                },
                {
                    "Red": 10,
                    "Green": 111,
                    "Blue": 0
                },
                {
                    "Red": 245,
                    "Green": 20,
                    "Blue": 112
                }
            ]
        
            var collectionUnderTest = ColorQuantization.ExtractPixelsFrom(byteArray);
            
            for(let i=0; i < collectionUnderTest.length; i++) {
                assert(collectionUnderTest[i].Red === expectedCollection[i].Red, "Expected "+ i + " index to contain "+ expectedCollection[i].Red + ", but it was " + collectionUnderTest[i].Red);
                assert(collectionUnderTest[i].Green === expectedCollection[i].Green, "Expected "+ i + " index to contain "+ expectedCollection[i].Green + ", but it was " + collectionUnderTest[i].Green);
                assert(collectionUnderTest[i].Blue === expectedCollection[i].Blue, "Expected "+ i + " index to contain "+ expectedCollection[i].Blue + ", but it was " + collectionUnderTest[i].Blue);
            }
            
        });
    });
    describe("DetermineTheLongestDimension(byteArray)", function(){
        it("returns the name of longest range.", function(){
            let expectedValue = "Blue"
            let collection = ColorQuantization.ExtractPixelsFrom(byteArray);
            var valueReturned = ColorQuantization.DetermineTheLongestDimension(collection);
            
            assert.equal(valueReturned,expectedValue);
        });
    });
    describe("SortPixelsByColorRange(collection,longestDimension)", function(){
        let collection = ColorQuantization.ExtractPixelsFrom(byteArray);
        let colorNameOfGreatestRange = ColorQuantization.DetermineTheLongestDimension(collection);
        let expectedCollection = [
            {
                "Red": 10,
                "Green": 111,
                "Blue": 0
            },
            {
                "Red": 255,
                "Green": 250,
                "Blue": 3
            },
            {
                "Red": 245,
                "Green": 20,
                "Blue": 112
            },
            {
                "Red": 255,
                "Green":15,
                "Blue": 200
            }
        ]
        it("returns colors sorted least to greatest by specific color property", function() {
            var collectionUnderTest = ColorQuantization.SortPixelsByColorRange(collection,colorNameOfGreatestRange);

            var previousValue = -1
            for(let i=0; i < collectionUnderTest.length; i++) {
                assert(collectionUnderTest[i][colorNameOfGreatestRange] >= previousValue, "Expected "+ collectionUnderTest[i][colorNameOfGreatestRange] + "to be lesss than or equal to " + previousValue);
                previousValue = collectionUnderTest[i][colorNameOfGreatestRange];
            }
        });
    });
    describe("FindMedianOfACollection(collection, nameOfLongestDimension)", function(){
        describe("given a collection has odd amount indexes,", function(){
            let collection = [
                {
                    "Red": 0,
                    "Green": 0,
                    "Blue": 100
                },
                {
                    "Red": 0,
                    "Green": 0,
                    "Blue": 100
                },
                {
                    "Red": 0,
                    "Green": 0,
                    "Blue": 300
                }
            ]
            it("expect median median to equal middle value", function(){
                let nameOfLongestDimension = "Blue";
                let expectedMedianValue = 100;
                let valueUnderTest = ColorQuantization.FindMedianOfACollection(collection, nameOfLongestDimension);
                assert(valueUnderTest === expectedMedianValue, "Expected value to be " + expectedMedianValue + ", but returned " + valueUnderTest + " for " + nameOfLongestDimension + " Dimension.");
           
            });
           
        });
        describe("given an collection has even amount of indexes,", function() {
            let collection = [
                {
                    "Red": 0,
                    "Green": 0,
                    "Blue": 100
                },
                {
                    "Red": 0,
                    "Green": 0,
                    "Blue": 100
                },
                {
                    "Red": 0,
                    "Green": 0,
                    "Blue": 300
                },
                {
                    "Red": 0,
                    "Green": 0,
                    "Blue": 300
                }
            ]
            it("expect median to be a value between two indexes.", function(){
                let nameOfLongestDimension = "Blue";
                let expectedMedianValue = 200;
                let valueUnderTest = ColorQuantization.FindMedianOfACollection(collection, nameOfLongestDimension);
                assert(valueUnderTest, expectedMedianValue);
           
            });
        });
    });
    describe("SplitCollectionByMedian(collection, medianValue, nameOfLongestDimension)", function() {
        describe("collection that is even", function(){
            it("expect return two collections one less than median and one greater than or equal to median", function() {
                let collection = [
                    {
                        "Red": 0,
                        "Green": 0,
                        "Blue": 100
                    },
                    {
                        "Red": 0,
                        "Green": 0,
                        "Blue": 100
                    },
                    {
                        "Red": 0,
                        "Green": 0,
                        "Blue": 300
                    },
                    {
                        "Red": 0,
                        "Green": 0,
                        "Blue": 300
                    }
                ]
    
                let medianValue = 200;
                let nameOfLongestDimension = "Blue";
    
                let [firstHalf, secondHalf] = ColorQuantization.SplitCollectionByMedian(collection, medianValue, nameOfLongestDimension);
            
                assert.equal(firstHalf.length, 2);
                assert.equal(secondHalf.length, 2);
    
            });
        });
        describe("collection that is odd", function(){
            it("expect return two collections one before median and after median", function() {
                let collection = [
                    {
                        "Red": 0,
                        "Green": 0,
                        "Blue": 100
                    },
                    {
                        "Red": 0,
                        "Green": 0,
                        "Blue": 100
                    },
                    {
                        "Red": 0,
                        "Green": 0,
                        "Blue": 300
                    }
                ]
    
                let median = 100;
                let greatestColorDimension = "Blue";
    
                let [firstHalf, secondHalf] = ColorQuantization.SplitCollectionByMedian(collection, median, greatestColorDimension);
            
                assert.equal(firstHalf.length, 0);
                assert.equal(secondHalf.length, 3);
            });
        });
    });
});