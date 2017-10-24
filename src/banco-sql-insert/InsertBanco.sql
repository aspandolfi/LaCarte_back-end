INSERT INTO public."user"(
             email, cpf, senha, telefone, sobrenome, nome,
            token, "tokenFacebook", "createdAt", "updatedAt", version)
    VALUES ( 'lukas@gmail.com', 1253, '123', '3328', 'gomes', 'lucas',
            'sdvcsdv684684', 'sadfsdf5684684', '12-12-2017' , '12-12-2017', 1);


INSERT INTO public.cliente(
            email, cnpj, senha, telefone, nome, token,  "createdAt", "updatedAt",
            version)
    VALUES ( 'lukas@gmail.com', '1253', '123', '3328', 'lucas',
            'sdvcsdv684684', '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.restaurante(
            nome, descricao, endereco, telefone, site, ativo, "createdAt",
            "updatedAt", version, cliente)
    VALUES ( 'la carte', 'melhor do brasil', 'av. marataizes', '3328', 'www.lacarte.com',
            true, '12-12-2017' , '12-12-2017', 1, 1);

INSERT INTO public.mesa(
            numero, qrcode, "createdAt", "updatedAt", version, restaurante)
    VALUES (1, 123,  '12-12-2017' , '12-12-2017', 1, 1);

INSERT INTO public.tipo_produto(
            nome, "createdAt", "updatedAt", version)
    VALUES ('comida',  '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.tipo_produto(
            nome, "createdAt", "updatedAt", version)
    VALUES ('bebida',  '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.tipo_produto(
            nome, "createdAt", "updatedAt", version)
    VALUES ('sobremesa',  '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.produto(
            nome, descricao, valor, "urlImagem", ativo, "createdAt",
            "updatedAt", version, "tipoProduto")
    VALUES ('lasanha', 'de frango', 16.00, 'www.lasanha.com', true,  '12-12-2017' , '12-12-2017', 1, 1);

INSERT INTO public.produto(
            nome, descricao, valor, "urlImagem", ativo, "createdAt",
            "updatedAt", version, "tipoProduto")
    VALUES ('agua', 'sem gas', 2.00, 'www.agua.com', true,  '12-12-2017' , '12-12-2017', 1, 2);

INSERT INTO public.produto(
            nome, descricao, valor, "urlImagem", ativo, "createdAt",
            "updatedAt", version, "tipoProduto")
    VALUES ('sorvete', '3 sabores', 5.00, 'www.sorvete.com', true,  '12-12-2017' , '12-12-2017', 1, 3);

INSERT INTO public.adicional(
            nome, "createdAt", "updatedAt", version)
    VALUES ('queijo', '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.adicional(
            nome, "createdAt", "updatedAt", version)
    VALUES ('bacon', '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.pedido(
            "valorTotal", fechado, "createdAt", "updatedAt", version,
            "user", mesa)
    VALUES (16.00, false,  '12-12-2017' , '12-12-2017', 1,
            1, 1);

INSERT INTO public.produto_adicionais(
            valor, "createdAt", "updatedAt", version, produto, adicionais)
    VALUES (2.00, '12-12-2017' , '12-12-2017', 1, 1, 1);

INSERT INTO public.cardapios(
            nome, descricao, ativo,  "createdAt", "updatedAt", version,
            restaurante)
    VALUES ('cardapio da casa', 'todos os produtos', true, '12-12-2017' , '12-12-2017', 1,
            1);

INSERT INTO public.produto_cardapios_cardapios_id(
            "produtoId", "cardapiosId")
    VALUES (1, 1);

INSERT INTO public.item_pedido(
            quantidade, "valorDesconto", "createdAt", "updatedAt", version,
            pedido, produto)
    VALUES (1, 0.0, '12-12-2017' , '12-12-2017', 1,
            1, 1);

INSERT INTO public.item_pedido_adicional(
            quantidade,  "createdAt", "updatedAt", version, "itemPedido",
            adicional)
    VALUES (1, '12-12-2017' , '12-12-2017', 1, 1,
            1);

