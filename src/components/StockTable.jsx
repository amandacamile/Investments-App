import React, { useEffect, useState } from "react";
import fetchStocksAPI from "../services/stocksAPI";

const StockTable = () => {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    (
      async () => {
        setStocks(await fetchStocksAPI());
      }
    )();
  }, [])

  return (
    <div>
      <table>
        <caption>Disponíveis para investir:</caption>
        <thead>
          <tr>
            <th>Ação</th>
            <th>Qtde</th>
            <th>Valor (R$)</th>
            <th>Negociar</th>
          </tr>
        </thead>
        <tbody>
          {
            stocks.map((stock) => {
              return (
                <tr key={stock.AssetCode}>
                  <td>{stock.AssetName}</td>
                  <td>{stock.AssetQtd}</td>
                  <td>{stock.Valor}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default StockTable; 