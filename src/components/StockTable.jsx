import React, { useContext } from 'react';
import { StocksContext } from '../context/StocksContext';
import { ModalContext } from '../context/ModalContext';

function StockTable() {
  const { stocks } = useContext(StocksContext);
  const { openModal } = useContext(ModalContext);

  const handleButton = ({
    id, name, qtd, value,
  }) => {
    openModal({
      id, name, qtd, value,
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <table className="w-2/4">
        <caption className="bg-chinese-black text-white font-bold text-base py-1 rounded-t">Disponíveis para investir:</caption>
        <thead className="bg-tangerine-yellow">
          <tr>
            <th className="px-4 py-3 text-center text-base font-bold tracking-wider">Ação</th>
            <th className="px-4 py-3 text-center text-base font-bold tracking-wider">Qtde</th>
            <th className="px-4 py-3 text-center text-base font-bold tracking-wider">Valor (R$)</th>
            <th className="px-4 py-3 text-center text-base font-bold tracking-wider">Negociar</th>
          </tr>
        </thead>
        <tbody className="bg-light-grey">
          {
            stocks.map((stock) => (
              <tr key={stock.AssetCode}>
                <td className="px-4 py-3 text-center text-sm font-medium text-black">{stock.AssetName}</td>
                <td className="px-4 py-4 text-center text-sm font-medium text-black">{stock.AssetQtd}</td>
                <td className="px-4 py-4 text-center text-sm font-medium text-black">{stock.Value}</td>
                <td className="flex justify-center px-4 py-4">
                  <button
                    type="button"
                    className="bg-tangerine-yellow rounded-full py-2 px-4 just"
                    onClick={() => handleButton({
                      id: stock.AssetCode,
                      name: stock.AssetName,
                      qtd: stock.AssetQtd,
                      value: stock.Value,
                    })}
                  >
                    $
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
