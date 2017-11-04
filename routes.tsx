import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './Home/Home';
import { AboutItemComponent, AboutThisClient } from './AboutItem/AboutItems';
import { ItemsSearchComponent, ItemsSearchClient, ItemsViewModelClient } from './ItemSearch/ItemsSearch'
import { ItemPageContainer, ItemPageClient, AboutThisItemViewModelClient } from './ItemPage/ItemPageContainer';

export const routes = <Layout>
    <Route exact path='/' component={Home} />

    <Route exact path='/AboutItems' render={(props) => (
        <AboutItemComponent {...props} aboutClient={AboutThisClient}/> 
    )} />

    <Route exact path='/BrowseItems' render={(props) => (
        <ItemsSearchComponent {...props}
            itemsSearchClient={ItemsSearchClient}
            itemsViewModelClient={ItemsViewModelClient} />
    )} />

    <Route exact path='/Item' render={(props) => (
        <ItemPageContainer {...props}
            aboutThisClient={AboutThisItemViewModelClient}
            itemPageClient={ItemPageClient} />
    )} />


</Layout>;