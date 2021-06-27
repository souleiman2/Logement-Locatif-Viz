/**
 * This function will return a list of the most common relavant words in the title with their occurences
 * 
 * @param {object[]} data The dataset to process
 * @returns {object[]} The dataset that represents the words with their occurences in descending order of occurence
 * 
 */
export function endResult(data, nbWords){
  let extracted_titles = extractTitles(data)
  let cleaned_titles = cleanTitles(extracted_titles)
  let counter_words = counterWords(cleaned_titles)
  return counter_words.slice(0, nbWords)
}


/**
 * This function will only get the titles of the dataset
 * 
 * @param {object[]} data The dataset to process
 * @returns {string[]} All the titles in a list
 * 
 */
function extractTitles(data){
  return data.map(x => x["title"])
}

/**
 * This function will seperate the different words and will filter the elements that we do not wish to retain 
 * (such as punctuation, numbers, stopwords)
 * 
 * @param {string[]} data The dataset to process
 * @returns {string[]} All the titles in a list
 * 
 */
function cleanTitles(data){
  let ans = []
  data.forEach((title) => {
    title = title.toLowerCase()
    let clean_title = title.replace(/[.,\/#!$%\^&\*|+-;:–{}=\-_`~()0-9]/g,"") // remove punctuation and numbers
    clean_title = clean_title.replace(/\s+/g, ' ').trim() // remove double spaces
    let words = clean_title.split(" ")
    ans = [...ans, ...words]
  })
  return ans
}

/**
 * This function will take the cleaned words and will count all of the words and put them in descending order.
 * This will also remove the stopwords
 * 
 * @param {string[]} data All the relavant words of the titles
 * @returns {object[]} The Counter version of the data
 * 
 */
function counterWords(data){
  const en_stop_words = ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't", 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', "can't", 'cannot', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd", "he'll", "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'i', "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's", 'me', 'more', 'most', "mustn't", 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours\tourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll", "she's", 'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've", 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll", "we're", "we've", 'were', "weren't", 'what', "what's", 'when', "when's", 'where', "where's", 'which', 'while', 'who', "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't", 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself', 'yourselves']
  const fr_stop_words = ['à', 'de', 'alors', 'au', 'aucuns', 'aussi', 'autre', 'avant', 'avec', 'avoir', 'bon', 'car', 'ce', 'cela', 'ces', 'ceux', 'chaque', 'ci', 'comme', 'comment', 'dans', 'des', 'du', 'dedans', 'dehors', 'depuis', 'devrait', 'doit', 'donc', 'dos', 'début', 'elle', 'elles', 'en', 'encore', 'essai', 'est', 'et', 'eu', 'fait', 'faites', 'fois', 'font', 'hors', 'ici', 'il', 'ils', 'je\tjuste', 'la', 'le', 'les', 'leur', 'là', 'ma', 'maintenant', 'mais', 'mes', 'mien', 'moins', 'mon', 'mot', 'même', 'ni', 'nommés', 'notre', 'nous', 'ou', 'où', 'par', 'parce', 'pas', 'peut', 'peu', 'plupart', 'pour', 'pourquoi', 'quand', 'que', 'quel', 'quelle', 'quelles', 'quels', 'qui', 'sa', 'sans', 'ses', 'seulement', 'si', 'sien', 'son', 'sont', 'sous', 'soyez\tsujet', 'sur', 'ta', 'tandis', 'tellement', 'tels', 'tes', 'ton', 'tous', 'tout', 'trop', 'très', 'tu', 'voient', 'vont', 'votre', 'vous', 'vu', 'ça', 'étaient', 'état', 'étions', 'été', 'être']
  const others = ["½", "er", "id", "e", "ndg"]


  let temp = {}
  data.forEach(word => {
    temp[word] = temp.hasOwnProperty(word) ? temp[word] + 1  : 1
  })
  let ans = []
  for (const elem of Object.entries(temp)) {
    
    if(!(en_stop_words.includes(elem[0]) || fr_stop_words.includes(elem[0]) || others.includes(elem[0]))){
      ans.push(elem)
    }
  }
  ans.sort(function(a,b){
    return b[1] - a[1] 
  })

  return ans
}