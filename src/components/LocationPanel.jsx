import React from 'react';

export default function LocationPanel(props) {
    const {
        suggestions,
        setPickup,
        setDestination,
        activeField,
    } = props;

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.description);
        } else if (activeField === 'destination') {
            setDestination(suggestion.description);
        }
    };

    return (
        <div className='mt-5 space-y-2 overflow-y-auto no-scrollbar'>
            {suggestions.length > 0 ? (
                suggestions.map((suggestion, idx) => (
                    <div
                        key={suggestion.place_id || idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex active:bg-gray-100 hover:bg-gray-50 border border-transparent active:border-gray-200 p-4 rounded-2xl gap-4 items-center transition-all cursor-pointer group"
                    >
                        <div className="h-12 w-12 bg-gray-100 flex justify-center items-center rounded-full group-hover:bg-white transition-colors shrink-0 shadow-sm">
                            <i className="ri-map-pin-2-fill text-xl text-gray-600 group-hover:text-black transition-colors"></i>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm leading-snug">{suggestion.description}</h4>
                    </div>
                ))
            ) : (
                <div className='flex flex-col items-center justify-center py-10 text-gray-400'>
                    <i className="ri-search-line text-4xl mb-2 opacity-20"></i>
                    <p className='text-sm font-medium'>Start typing to see suggestions</p>
                </div>
            )}
        </div>
    );
}
