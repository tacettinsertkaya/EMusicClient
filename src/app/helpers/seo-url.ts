export class SeoUrl{
    ToSeoUrl(url) {
    
        url=url.trim();
    
        // make the url lowercase         
        var encodedUrl = url.toString().toLowerCase(); 
        encodedUrl=this.slugify(encodedUrl);
        // replace & with and           
        encodedUrl = encodedUrl.split(/\&+/).join("-and-")
      
        // remove invalid characters 
        encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       
      
        // remove duplicates 
        encodedUrl = encodedUrl.split(/-+/).join("-");
      
        // trim leading & trailing characters 
        encodedUrl = encodedUrl.trim('-'); 
    
       
      
        return encodedUrl; 
      }

      
  slugify(text) {
    var trMap = {
        'çÇ':'c',
        'ğĞ':'g',
        'şŞ':'s',
        'üÜ':'u',
        'ıİ':'i',
        'öÖ':'o'
    };
    for(var key in trMap) {
        text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
    }
    return  text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
                .replace(/\s/gi, "-") // convert spaces to dashes
                .replace(/[-]+/gi, "-") // trim repeated dashes
                .toLowerCase();

}
}