export default function PdfNotes() {
  return (
    <div className="z-50 bg-gray-500 p-8 min-w-[300px]">
      <h1 className="text-2xl text-center">PD-000003293</h1>
      <hr className="w-full" />
      <div className="flex flex-col justify-center items-start space-y-3 mb-3">
        <div className="flex justify-center items-center gap-2">
          <strong>F.Emisión</strong>
          <span>2024-04-13</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <strong>Mozo</strong>
          <span>Julio</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <strong>Anfitriona</strong>
          <span>H.Emisión</span>
        </div>
      </div>
      <table className="">
        <tr className="border-y border-black">
            <th>CANT.</th>
            <th>DESCRIPTION</th>
            <th>P.UNIT</th>
            <th>TOTAL</th>
        </tr>
        <tr className="border-b border-black">
            <td>1</td>
            <td>Corona light + compañia</td>
            <td>60.00</td>
            <td>60.00</td>
        </tr>
      </table>
      <div className="border-b border-black p-2">
        <span>Total a pagar: S/ 60.00</span>
      </div>
    </div>
  );
}
