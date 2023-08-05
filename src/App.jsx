import React from 'react';
import './App.css'
import { SortDateTable, SortMonthTable, SortYearTable } from './components/SortDate';

const dateUrl = import.meta.env.VITE_APP_DATE_URL

export default class App extends React.Component {
    state = {
      list: []
    };

    async fetchDate() {
        const response = await fetch(dateUrl)
        try {
            const date = await response.json()
            this.setState(await {...date})
        } catch (error) {console.log(error)}
    } 

    componentDidMount() {
        this.fetchDate();
    }

    render() {
        const {list} = this.state;
        return (
            <div id="app">
                <SortMonthTable list={list} />
                <SortYearTable list={list} />
                <SortDateTable list={list} />
            </div>
        );
  }
}
