export const storage = {
    saveFavoriteCitiesInStorage(LIST_OF_FAVORITE_CITIES) {
        return localStorage.setItem('favoriteCities', JSON.stringify(LIST_OF_FAVORITE_CITIES))
    },
    getFavoriteCitiesFromStorage() {
        return JSON.parse(localStorage.getItem('favoriteCities'))
    },
    saveCurrentCityInStorage(currentCity) {
        return localStorage.setItem('currentCity', JSON.stringify(currentCity))
    },
    getCurrentCityFromStorage() {
        return JSON.parse(localStorage.getItem('currentCity'))
    },
}