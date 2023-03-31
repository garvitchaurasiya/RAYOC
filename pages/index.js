import React, { Component } from 'react'
import collegerating from '../ethereum/collegerating';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout';
import Link from 'next/link'

export class RatingIndex extends Component {

  static async getInitialProps() {
    const ratings = await collegerating.methods.getCollegesRatings().call();
    const totalRatings = await collegerating.methods.totalRatings().call();

    return { ratings, totalRatings };
  }

  renderRatings = () => {
    // this.props.ratings.reverse();

    // const items = this.props.ratings.map(rating => {
    //   return {
    //     header: rating[0],
    //     meta: rating[1],
    //     description: rating[3],
    //     fluid: true
    //   }
    // })
    const items = [];
    const rating = this.props.ratings;

    for (let i = this.props.totalRatings - 1; i >= 0; i--) {
      const proper = {
        header: rating[i][0],
        meta: rating[i][1],
        description: rating[i][3],
        fluid: true
      }
      items.push(proper);
    }
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <Layout>

          <Link href='/post'>
            <Button
              floated='right'
              content="Post feeback"
              icon="add circle"
              primary
            />
          </Link>

          {this.renderRatings()}

        </Layout>
      </div>
    )
  }
}

export default RatingIndex