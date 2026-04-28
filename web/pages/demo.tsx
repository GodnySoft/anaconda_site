import DemoWorkspace from '../components/DemoWorkspace';

export default function Demo() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Так выглядит работа внутри ANACONDA</h1>
      <p className="text-center mb-8">Один экран, где менеджер видит клиента, историю общения, счета, оплату и следующие действия.</p>
      <DemoWorkspace />
    </div>
  );
}
