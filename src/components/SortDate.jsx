import React from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SortTable from "./SortTable";
import MonthTable from "./MonthTable";
import YearTable from './YearTable';

dayjs.locale('en');
dayjs.extend(customParseFormat)

/**
 * НОС для компонентов
 */
function sortDate(Component, tag, year) {
  return class extends React.Component {
    static get displayName() {
      const name = Component.displayName || Component.name || 'Component';
      return `SortDate(${name})`;
    }
    
    listNew(props) {
      const newProps = {
        list: []
      }
      const obj = {}

      const list = props.list.sort((a, b) => dayjs(b.date, 'YYYY-MM-DD') - dayjs(a.date, 'YYYY-MM-DD'));

      if (tag && tag === 'Year') {
        list.map(item => obj[item.date.slice(0, 4)] ? obj[item.date.slice(0, 4)] += item.amount : obj[item.date.slice(0, 4)] = item.amount)
        newProps.list = Object.keys(obj).map(item => {
          return {year: item, amount: obj[item]}
        }).sort((a, b) => dayjs(b.year, 'YYYY') - dayjs(a.year, 'YYYY'))
        return newProps
      }

      if (tag && tag === 'Month' && year) {
        const years = list.filter((item) => item.date.slice(0, 4) === year)
        years.map(
          item => obj[dayjs(item.date, 'YYYY-MM-DD').format('MMM')] ?
          obj[dayjs(item.date, 'YYYY-MM-DD').format('MMM')] += item.amount :
          obj[dayjs(item.date, 'YYYY-MM-DD').format('MMM')] = item.amount
        )
        newProps.list = Object.keys(obj).map(item => {
          return {month: item, amount: obj[item]}
          
        }).sort((a, b) => dayjs(b.month, 'MMM') - dayjs(a.month, 'MMM'))
        return newProps
      }
      newProps.list = list
      return newProps
    }

    render() {
      // console.log(this.listNew(this.props))
      const newProps = this.listNew(this.props)
      return <Component {...newProps} />;
      }
  };
}

/**
 * компонент SortTable обернутый в НОС
 */
export const SortDateTable = sortDate(SortTable);

/**
 * компонент MonthTable обернутый в НОС
 */
export const SortMonthTable = sortDate(MonthTable, 'Month', '2018');

/**
 * компонент MonthTable обернутый в НОС
 */
export const SortYearTable = sortDate(YearTable, 'Year')
