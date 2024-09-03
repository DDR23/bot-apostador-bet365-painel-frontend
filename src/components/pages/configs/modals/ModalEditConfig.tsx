// import { useState, useEffect } from 'react';
// import GetSocket from '../../../../utils/GetSocket';
// import { notifications } from '@mantine/notifications';

// export default function ModalEditConfig() {
//   const [configData, setConfigData] = useState({
//     USER: "magaiver",
//     PASSWORD: "password123",
//     TIME_START: "08:00",
//     TIME_FINISH: "17:00",
//     STOP_WIN: 1000,
//     STOP_LOSS: 500,
//     ESTRATEGIES: [
//       {
//         DIFF_SET: 2,
//         DIFF_POINT: 6,
//         MULTIP: 1.7,
//         ODD_VALUE: 4
//       },
//       {
//         DIFF_SET: null,
//         DIFF_POINT: null,
//         MULTIP: 1.7,
//         ODD_VALUE: 2
//       }
//     ],
//     STATUS: true,
//   });

//   const socket = GetSocket();

//   useEffect(() => {
//     socket.on('config_get_res', (response) => {
//       notifications.show({
//         message: response,
//       });
//     });
//     return () => {
//       socket.off('config_get_res');
//     };
//   }, [socket]);

//   const handleSaveClick = () => {
//     socket.emit('config_post', configData);
//   };

//   const handleGetClick = () => {
//     socket.emit('config_get', configData.USER);
//   };

//   return (
//     <div>
//       <h1>Configuração</h1>
//       <button onClick={handleSaveClick}>Salvar Configuração</button>
//       <button onClick={handleGetClick}>GET</button>
//     </div>
//   );
// }












// const { fields, append, remove } = useFieldArray({
//   control,
//   name: "ESTRATEGIES",
// });
// const addStrategy = () => {
//   append({ DIFF_SET: 0, DIFF_POINT: 0, MULTIP: 0, ODD_VALUE: 0 });
// };


{/* <Controller
    name="STOP_WIN"
    control={control}
    render={({ field }) => (
      <NumberInput
        {...field}
        placeholder="Stop Win"
        min={0}
        allowDecimal={false}
        leftSection={<IconTrophy size={20} />}
      />
    )}
  />
  <Controller
    name="STOP_LOSS"
    control={control}
    render={({ field }) => (
      <NumberInput
        {...field}
        placeholder="Stop Loss"
        min={0}
        allowDecimal={false}
        leftSection={<IconXboxX size={20} />}
      />
    )}
  /> */}