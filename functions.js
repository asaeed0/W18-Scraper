module.exports = {
    getDate: function() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        mm = ((mm < 10) ? `0${mm}` : mm );
        let dd = d.getDate();
        dd = ((dd < 10) ? `0${dd}` : dd );
        let date = `${yyyy}-${mm}-${dd}`;
        return date;
    },

    //  Returns true if the date given matches todays date
    checkDate: function(date) {
        let today = module.exports.getDate();
        if (today === date) { 
            return true;
        } else {
            return false;
        }
    },
}

