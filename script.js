const stopWords = [
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any",
    "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", 
    "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", 
    "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", 
    "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", 
    "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", 
    "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", 
    "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", 
    "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", 
    "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", 
    "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", 
    "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", 
    "theirs", "them", "themselves", "then", "there", "there's", "these", "they", 
    "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", 
    "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", 
    "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", 
    "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", 
    "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", 
    "yours", "yourself", "yourselves"];

  


const inputElement = document.querySelector('#getfile')
console.dir(inputElement);

const userDocument = document.querySelector('#wc_document')


const showWordCloudElement = document.querySelector('#wc_cloud')

function wordCloud(){
    // NOTE: Retrieve information about the selected file
    const userFile = this.files[0] 
    // console.log(userFile);
    // NOTE: Check if the file is a text file
    try {
        const isText = userFile.type.startsWith('text')
        if(!isText){
            throw `${userFile.name} is not a text file`
        }
        const reader = new FileReader()
        // console.log(reader);
        // NOTE: Read the contents of the selected file
        reader.readAsText(userFile)
        // console.log(reader);
        // NOTE: Once the file has finished loading, display in the page
        reader.onload = function(){
            // console.log(reader.result);
            userDocument.innerHTML = reader.result
            let sourceText = userDocument.textContent
            sourceText = sourceText.toLowerCase()
            sourceText = sourceText.trim()

            //NOTE:  Leave only alphabet characters and whitespace in the text
            const alphaRegx = /[^a-zA-Z\s]/g
            sourceText = sourceText.replace(alphaRegx, '')

            // NOTE: Remove stop words from the text
            for (const word of stopWords) {
                // console.log(word);
                const stopRegex = new RegExp(`\\b${word}\\b`,`g`)
                // console.log(stopRegex);
                sourceText = sourceText.replace(stopRegex, '')
            }
            const words = sourceText.split(/\s+/g)
            // NOTE: Sort the words in alphabetical order
            words.sort()
            // console.log(words);
            uniqueArray(words)

            // NOTE: Count the number of times each word appears in the text(exchange arr to obj)
            // const obj = words.reduce((acc, currenValue) => {
            //     if(acc[currenValue]) acc[currenValue]++
            //     else acc[currenValue] = 1
            //     return acc
            // },{})
            // console.log(obj);
        }       
    } catch (error) {
        alert(error);
    }
}


function uniqueArray (arr){
    let unique = [[arr[0], 1]]

    let uniqueIndex = 0

    for (let index = 1; index < arr.length; index++) {
        if(arr[index] === arr[index-1]){
            unique[uniqueIndex][1]++
            }else{
                uniqueIndex++
                unique[uniqueIndex] = [arr[index], 1]
        }
        
    }
    // console.log(unique);

    // NOTE: Sort by descending order of duplicate count
    unique.sort(byDuplicate)


    function byDuplicate(a,b) {
        return b[1] - a[1]
    }

    unique = unique.slice(0, 100)

    console.log(unique);


    //NOTE: Find the duplicates of the most-repeated word
    let maxCount = unique[0][1];
    // NOTE: Sort the word list in alphabetic order
    unique.sort();



    // console.log(unique);

    showWordCloud(unique, maxCount)

}


// NOTE: Display the word cloud
function showWordCloud(arr, max) {
    for (let index = 0; index < arr.length; index++) {
       const word = document.createElement('span')
       word.textContent = arr[index][0]
        // Scale the font size between 1em and 3em for better visibility
        const scale = (arr[index][1] / max) * 2 + 1;
        word.style.fontSize = `${scale}em`;
        
        // Add some spacing between words
        word.style.margin = '0.25em';
        word.style.display = 'inline-block';
       showWordCloudElement.appendChild(word)
    }
}



inputElement.addEventListener('change', wordCloud)



