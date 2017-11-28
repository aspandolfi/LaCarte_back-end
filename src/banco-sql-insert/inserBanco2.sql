INSERT INTO public."user"(
             email, cpf, senha, telefone, sobrenome, nome,
            token,  "createdAt", "updatedAt", version)
    VALUES ( 'lukas@gmailll.com', 125333, '12333', '3328', 'gomes', 'lucas',
            'sdvcsdv684684','12-12-2017' , '12-12-2017', 1);


INSERT INTO public.cliente(
            email, cnpj, senha, telefone, nome, token,  "createdAt", "updatedAt",
            version)
    VALUES ( 'lukas@gmailll.com', '125333', '12333', '3328', 'lucas',
            'sdvcsdv684684', '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.restaurante(
            nome, descricao, endereco, telefone, site, ativo, "createdAt",
            "updatedAt", version, "clienteId")
    VALUES ( 'la carte', 'melhor do brasil', 'av. marataizes', '3328', 'www.lacarte.com',
            true, '12-12-2017' , '12-12-2017', 1, 1);

INSERT INTO public.mesa(
            numero, qrcode, "createdAt", "updatedAt", version, "restauranteId")
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
            "updatedAt", version, "tipoProdutoId")
    VALUES ('lasanha', 'Lorem ipsum dolorectetur. Suspendisse potenti. Phasellus aliquet.', 16.00, 'http://www.pifpaf.com.br/img/000000000000050138006.JPG', true,  '12-12-2017' , '12-12-2017', 1, 1);

INSERT INTO public.produto(
            nome, descricao, valor, "urlImagem", ativo, "createdAt",
            "updatedAt", version, "tipoProdutoId")
    VALUES ('agua', 'Lorem ipsum dolorectetur. Suspendisse potenti. Phasellus aliquet.', 16.00, 'http://www.flaska.com.br/documents/flaska.com.br/large/396.jpg', true,  '12-12-2017' , '12-12-2017', 1, 2);

INSERT INTO public.produto(
            nome, descricao, valor, "urlImagem", ativo, "createdAt",
            "updatedAt", version, "tipoProdutoId")
    VALUES ('sorvete', 'Lorem ipsum dolorectetur. Suspendisse potenti. Phasellus aliquet.', 16.00, 'https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia11042/slide/sorvetes1-cursos-cpt.jpg', true,  '12-12-2017' , '12-12-2017', 1, 3);

INSERT INTO public.adicional(
            nome, "createdAt", "updatedAt", version)
    VALUES ('queijo', '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.adicional(
            nome, "createdAt", "updatedAt", version)
    VALUES ('bacon', '12-12-2017' , '12-12-2017', 1);

INSERT INTO public.pedido(
            "valorTotal", fechado, "createdAt", "updatedAt", version,
            "userId", "mesaId")
    VALUES (16.00, false,  '12-12-2017' , '12-12-2017', 1,
            1, 1);

INSERT INTO public.produto_adicionais(
            valor, "createdAt", "updatedAt", version, "produtoId", "adicionaisId")
    VALUES (2.00, '12-12-2017' , '12-12-2017', 1, 1, 1);

INSERT INTO public.cardapio(
            nome, descricao, ativo,  "createdAt", "updatedAt", version,
            "restauranteId")
    VALUES ('cardapio da casa', 'todos os produtos', true, '12-12-2017' , '12-12-2017', 1,
            1);

INSERT INTO public.produto_cardapios_cardapio(
            "produtoId", "cardapioId")
    VALUES (1, 1);

INSERT INTO public.item_pedido(
            quantidade, "valorDesconto", "createdAt", "updatedAt", version,
            "pedidoId", "produtoId")
    VALUES (1, 0.0, '12-12-2017' , '12-12-2017', 1,
            1, 1);

INSERT INTO public.item_pedido_adicional(
            quantidade,  "createdAt", "updatedAt", version, "itemPedidoId",
            "adicionalId")
    VALUES (1, '12-12-2017' , '12-12-2017', 1, 1,
            1);

