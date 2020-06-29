import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../collections-preview/collections-preview.component'

import { selectCollections } from '../../reducer/shop/shop.selectors';

import './collections-overview.styles.scss';

const CollectionsOverview = ( { collections } ) => ( <div className='collections-overview'>

  {
    collections.map( ( {
      id,
      ...otherCollections
    } ) => ( <CollectionPreview key={id} {...otherCollections}/> ) )
  }
</div> );

const mapStateToProps = createStructuredSelector( { collections: selectCollections } )

export default connect( mapStateToProps )( CollectionsOverview );
