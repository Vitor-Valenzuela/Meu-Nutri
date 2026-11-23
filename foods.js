
const FOODS = [];

function addGroup(group, kcal, data) {
  data.split(";")
    .map(item => item.trim())
    .filter(Boolean)
    .forEach(item => {
      const separator = item.indexOf("|");
      if (separator < 0) return;

      const name = item.substring(0, separator).trim();
      const reference = item.substring(separator + 1).trim();

      if (!name || !reference) return;

      FOODS.push({
        id: FOODS.length + 1,
        name,
        group,
        kcal,
        reference
      });
    });
}

// GRUPO 1
addGroup("Arroz, pães, massas, batata e mandioca", 150, `
Amido de milho|2½ colheres de sopa;
Angu|3 colheres de sopa;
Arroz branco cozido|4 colheres de sopa;
Arroz integral cozido|6 colheres de sopa;
Aveia em flocos|3 colheres de sopa;
Batata cozida|1½ unidade;
Batata inglesa corada picada|3 colheres de servir;
Batata doce cozida|1½ colher de servir;
Batata sauté|2½ colheres de servir;
Biscoito tipo água e sal|5 unidades;
Biscoito de leite|6 unidades;
Biscoito tipo maisena|7 unidades;
Bolo de banana|1 fatia pequena;
Bolo de cenoura|1 fatia pequena;
Bolo de chocolate|1 fatia;
Bolo de milho|1 fatia;
Cará cozido/amassado|3½ colheres de sopa;
Cereal matinal|1 xícara de chá;
Chia|2 colheres de sopa;
Farinha de aveia|2½ colheres de sopa;
Farinha de mandioca|2½ colheres de sopa;
Farinha de milho|3½ colheres de sopa;
Farofa de farinha de mandioca|½ colher de servir;
Granola|4 colheres de sopa;
Inhame cozido/amassado|3½ colheres de sopa;
Macarrão cozido|3½ colheres de sopa;
Mandioca cozida|4 colheres de sopa;
Milho verde em espiga|1 espiga grande;
Milho verde em conserva|7 colheres de sopa;
Pãozinho caseiro|½ unidade;
Pão de batata|1 unidade média;
Pão de centeio|2 fatias;
Pão de forma tradicional|2 fatias;
Pão de milho|1 unidade média;
Pão de queijo|1 unidade;
Pão francês|1 unidade;
Pão hot dog|1 unidade;
Pipoca|3 xícaras de chá;
Polenta sem molho|2 fatias;
Purê de batata|2 colheres de servir;
Purê de inhame|3 colheres de servir;
Quinoa|4 colheres de sopa;
Tapioca (goma hidratada)|4 colheres de sopa;
Torrada salgada tipo|4 unidades;
Torrada (pão francês)|6 fatias
`);

// GRUPO 2
addGroup("Verduras e legumes", 15, `
Abóbora cozida (menina, japonesa, moranga)|2 colheres de sopa;
Abobrinha cozida|3 colheres de sopa;
Acelga cozida|2½ colheres de sopa;
Acelga crua (picada)|9 colheres de sopa;
Agrião|22 ramos;
Alface|15 folhas;
Almeirão|5 folhas;
Berinjela cozida|2 colheres de sopa;
Beterraba cozida|3 fatias;
Beterraba crua ralada|2 colheres de sopa;
Brócolis cozido|4½ colheres de sopa;
Broto de alfafa cru|1½ xícara de chá;
Broto de feijão cozido|1½ colher de servir;
Cenoura cozida (fatias)|7 fatias;
Cenoura cozida (picada)|1½ colher de sopa;
Cenoura crua (picada)|1 colher de servir;
Chuchu cozido|2½ colheres de sopa;
Couve-flor cozida|3 ramos;
Couve-manteiga cozida|1 colher de servir;
Ervilha em conserva|1 colher de sopa;
Ervilha fresca|1½ colher de sopa;
Escarola|15 folhas;
Espinafre cozido|2½ colheres de sopa;
Jiló cozido|1½ colher de sopa;
Maxixe cozido|3 colheres de sopa;
Mostarda|6 folhas;
Palmito em conserva|2 unidades;
Pepino japonês|1 unidade;
Pepino picado|4 colheres de sopa;
Picles em conserva|5 colheres de sopa;
Pimentão cru fatiado (vermelho/verde)|8 fatias;
Pimentão cru picado (vermelho/verde)|2½ colheres de sopa;
Quiabo cozido|2 colheres de sopa;
Rabanete|3 unidades;
Repolho branco cru (picado)|6 colheres de sopa;
Repolho cozido|5 colheres de sopa;
Repolho roxo cru (picado)|5 colheres de sopa;
Rúcula|15 ramos;
Tomate caqui|2½ fatias;
Tomate cereja|7 unidades;
Tomate comum|4 fatias;
Vagem cozida|2 colheres de sopa
`);

// GRUPO 3
addGroup("Frutas", 70, `
Abacate (amassado)|1½ colher de sopa;
Abacaxi|1 fatia;
Acerola|32 unidades;
Ameixa preta|3 unidades;
Ameixa-vermelha|4 unidades;
Banana|1 unidade;
Caju fresco|2½ unidades;
Caqui|1 unidade;
Carambola|2 unidades;
Cereja fresca|24 unidades;
Damasco seco|4 unidades;
Fruta do conde|½ unidade;
Goiaba|½ unidade;
Jabuticaba|20 unidades;
Jaca|4 bagos;
Kiwi|2 unidades;
Laranja bahia/seleta|8 gomos;
Laranja pêra/lima|1 unidade;
Limão|4 unidades;
Maçã|1 unidade;
Mamão formosa|1 fatia;
Mamão papaia|½ unidade;
Manga|1 unidade;
Manga|5 fatias;
Manga polpa batida|½ xícara de chá;
Maracujá (suco puro)|½ xícara de chá;
Melancia|2 fatias;
Melão|2 fatias;
Morango|10 unidades;
Nectarina|2 unidades;
Pêssego|2 unidades;
Salada de frutas (banana, maçã, laranja, mamão)|½ xícara de chá;
Suco de abacaxi|½ copo de requeijão;
Suco de laranja (puro)|¾ copo de requeijão;
Suco de melão|½ copo de requeijão;
Suco de tangerina|¾ copo de requeijão;
Tangerina/mexerica|1 unidade;
Uva comum|22 uvas;
Uva itália|8 uvas;
Uva rubi|8 uvas
`);

// GRUPO 4
addGroup("Carnes e ovos", 190, `
Atum em lata|2½ colheres de sopa;
Bacalhau|½ porção;
Bacalhau cozido|1 pedaço médio;
Bife de fígado grelhado|1 unidade média;
Bife enrolado|1 unidade;
Bife grelhado|1 unidade;
Camarão frito|13 unidades;
Carne assada (patinho)|1 fatia pequena;
Carne cozida|4 pedaços pequenos;
Carne moída refogada|3½ colheres de sopa;
Carne seca|2 pedaços pequenos;
Carne|1 unidade média;
Costela bovina assada|1 pedaço pequeno;
Espetinho de carne|2 unidades;
Frango assado inteiro|1 pedaço de peito ou 1 coxa ou 1 sobrecoxa;
Frango filé à milanesa|1 unidade;
Frango filé grelhado|1 unidade;
Frango sobrecoxa cozida sem pele e molho|1 unidade grande;
Hambúrguer grelhado|1 unidade;
Linguiça de porco cozida|1 gomo;
Manjubinha frita|10 unidades;
Merluza cozida|2 filés;
Mortadela|2 fatias médias;
Omelete simples|½ unidade;
Ovo cozido|2 unidades;
Ovo frito|2 unidades;
Peito de peru defumado|6 fatias;
Peixe espada cozido|1 filé;
Peru assado sem pele|2 fatias grandes;
Presunto sem capa de gordura|6 fatias;
Porco lombo assado|½ fatia;
Sardinha escabeche|1 unidade;
Sardinha em conserva|1 unidade média;
Tilápia grelhada|1 filé grande
`);

// GRUPO 5
addGroup("Leites, queijos e iogurtes", 120, `
Coalhada|2½ colheres de sopa;
Iogurte desnatado de frutas|½ copo de requeijão;
Iogurte desnatado natural|1½ copo de requeijão;
Iogurte integral natural|1 copo de requeijão;
Iogurte integral de frutas|½ copo de requeijão;
Leite de cabra integral|1 copo de requeijão;
Leite em pó integral|2 colheres de sopa;
Leite em pó desnatado|3 colheres de sopa;
Leite integral longa vida|1 xícara de chá;
Leite semidesnatado longa vida|1 copo de requeijão;
Leite tipo B|1 xícara de chá;
Leite tipo C|1 xícara de chá;
Queijo tipo minas frescal|1 fatia grande;
Queijo tipo minas|½ fatia;
Queijo tipo mussarela|3 fatias;
Queijo tipo parmesão ralado|3 colheres de sopa;
Queijo pasteurizado|2 unidades;
Queijo prato|1½ fatias;
Queijo provolone|1 fatia;
Requeijão cremoso|1½ colher de sopa;
Ricota|2 fatias;
Vitamina de leite com frutas|1 copo de requeijão
`);

// GRUPO 6
addGroup("Feijões e oleaginosas", 55, `
Ervilha seca cozida|2½ colheres de sopa;
Feijão branco cozido|1½ colher de sopa;
Feijão cozido (50% caldo)|1 concha;
Feijão cozido (somente grãos)|2 colheres de sopa;
Feijão preto cozido|1 concha média rasa;
Grão de bico cozido|1½ colher de sopa;
Lentilha cozida|2 colheres de sopa;
Soja cozida (somente grãos)|1½ colher de servir de arroz;
Amêndoas|8 unidades;
Avelã|5 unidades;
Castanha de caju|4 unidades;
Castanha do Pará|2 unidades;
Nozes|4 unidades
`);

// GRUPO 7
addGroup("Óleos e gorduras", 73, `
Azeite de dendê|¾ colher de sopa;
Azeite de oliva|1 colher de sopa;
Bacon (gordura)|½ fatia;
Manteiga|½ colher de sopa;
Margarina|½ colher de sopa;
Margarina líquida|1 colher de sopa;
Óleo vegetal composto de soja e oliva|1 colher de sopa;
Óleo vegetal de canola|1 colher de sopa;
Óleo vegetal de girassol|1 colher de sopa;
Óleo vegetal de milho|1 colher de sopa;
Óleo vegetal de soja|1 colher de sopa
`);

// GRUPO 8
addGroup("Açúcares e doces", 110, `
Achocolatado em pó|2 colheres de sopa;
Açúcar cristal|1 colher de sopa;
Açúcar mascavo fino|1 colher de sopa;
Açúcar mascavo grosso|1½ colher de sopa;
Açúcar refinado|1 colher de sopa;
Bananada|1 unidade média;
Doce de leite cremoso|1 colher de sopa;
Doce de mamão verde|2 colheres de sopa;
Geleia de frutas|1 colher de sopa;
Goiabada em pasta|½ fatia;
Melado|2 colheres de sopa;
Mel|2½ colheres de sopa
`);

console.log("Alimentos cadastrados:", FOODS.length);
