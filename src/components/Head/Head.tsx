import React from "react"
import { Helmet } from "react-helmet";

import { head } from "../../config/head";

const Head: React.FC = () => {

    const { title, description, keywords, url } = head;
    return (
        <Helmet>
            <title>{title}</title>
            <meta property="og:type" content="website" />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta name="keywords" content={keywords} />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={description} />
            {/* <meta property="og:image" content={image} /> */}
        </Helmet>
    );
}

export default Head;