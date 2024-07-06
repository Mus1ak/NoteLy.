export const validateEmail = (email) => {
    const regex = /^[^\s@]+@(gmail\.com|yahoo\.com|hotmail\.com)$/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if(!name) return "";
    
    const words = name.split(" ");
    let initials = "";

    for(let i=0; i<Math.min(words.length, 2); i++){
        initials += words[i][0];

    }
    return initials.toUpperCase();
}

export const getFirstName = (fullName) => {
    if(!fullName) return "";
    
    const words = fullName.split(" ")[0];
    const firstLetter = words.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = words.slice(1)

    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
};