export const getArgumentFromHash = (): any => window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial: any, item: any) => {
        if (item) {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});