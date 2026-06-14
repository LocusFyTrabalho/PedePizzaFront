export type PublicStackParamList = {
  Login: undefined;
  RecuperarSenha: undefined;
};
export type PrivateStackParamList = {
  Home: undefined;
  Perfil: undefined;
  Horas: undefined;
  RegistrarUsuario: undefined;
  ListaUsuario: undefined;
  Dashboard: undefined;
  ListaFuncionarios: undefined;
  PagamentoHoras: undefined;
  Mapa: { employeeName?: string; employeeCoords?: { latitude: number; longitude: number } } | undefined;
};