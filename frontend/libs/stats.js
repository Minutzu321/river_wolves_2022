export const getPrezenteStats = (participari) =>{
    let data = [
        {
          label: 'Purchases',
          data: [
            {
              date: new Date(),
              stars: 299320,
            },
          ],
        },
      ]

      participari.forEach(p => {
        data.push({
            label: "#"+p.id,
            data: [
                {
                  date: new Date(p.data_ora),
                  stars: 299320,
                },
              ],
        })
      });
}