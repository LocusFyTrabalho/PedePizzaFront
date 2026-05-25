// Rotas para quem NÃO está logado
export type PublicStackParamList = {
  Login: undefined;
  Cadastrese: undefined;
  RecuperarSenha: undefined;
};

// Rotas para quem ESTÁ logado
export type PrivateStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Carrinho: undefined;
  Pedido: undefined;
  Historico: undefined;
  Perfil: undefined;
  AceitarPedido: undefined;
  EditarCardapio: undefined;
};