/*global define*/
define([], function(){
    /**
     * @export  oroaddress/js/country/select2-handler
     * @class   oroaddress.country.select2Handler
     */
    return {
        handle: function(configs){
            if (configs['ajax']) {
                configs.minimumInputLength = 0;
                return;
            }

            configs['sortResults'] = function(results, container, query){
                if (!query.term || query.term.length < 1) {
                    return results;
                }
                var expression = new RegExp(query.term, 'im');

                var sortIteratorDelegate = function (first, second) {
                    var inFirst = first.text.search(expression);
                    var inSecond = second.text.search(expression);

                    if (inFirst == -1 || inSecond == -1) {
                        return inSecond - inFirst;
                    }

                    return inFirst - inSecond;
                }

                return results.sort(sortIteratorDelegate);
            }
        }
    };
});
