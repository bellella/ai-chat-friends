export function getQueryParams() {
    const queryString = window.location.search;

    return new URLSearchParams(queryString);
}