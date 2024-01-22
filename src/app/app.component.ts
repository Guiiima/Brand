import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // pessoas = [
  //   { nome: 'João', saldo: '1', sobrenomes: ['Silva'] },
  //   { nome: 'João', saldo: '2', sobrenomes: ['Henrique'] },
  //   { nome: 'João', saldo: '3', sobrenomes: ['Cristini'] },
  //   { nome: 'João', saldo: '4', sobrenomes: ['Aelin'] },
  //   { nome: 'Maria', saldo: '5', sobrenomes: ['Oliveira'] },
  //   { nome: 'Maria', saldo: '6', sobrenomes: ['teste1'] },
  //   { nome: 'Maria', saldo: '7', sobrenomes: ['teste2'] },
  //   { nome: 'Maria', saldo: '8', sobrenomes: ['teste3'] },
  //   { nome: 'Maria', saldo: '9', sobrenomes: ['teste4'] },
  //   { nome: 'gui', saldo: '10', sobrenomes: ['teste4'] },
  //   { nome: 'gui', saldo: '11', sobrenomes: ['teste5'] },
  //   { nome: 'gui', saldo: '12', sobrenomes: ['teste4'] },
  // ];
  title = 'fdp';
  nivelSelecionado: number = 4;
  mapaAgrupado = new Map<string, Cliente[]>();
  Agrupado: Cliente[] = [];
  pessoas: Cliente[] = [
    {
      nome: 'Cliente1',
      saldo: 1000,
      detalhes: [
        { sobrenomes: 'Sobrenome1', divida: 500, pagoParaTS: 200 },
        { sobrenomes: 'Sobrenome2', divida: 300, pagoParaTS: 100 },
      ],
    },
    {
      nome: 'Cliente1',
      saldo: 1500,
      detalhes: [
        { sobrenomes: 'Sobrenome3', divida: 200, pagoParaTS: 50 },
        { sobrenomes: 'Sobrenome4', divida: 100, pagoParaTS: 30 },
      ],
    },
    {
      nome: 'Cliente1',
      saldo: 1500,
      detalhes: [
        { sobrenomes: 'Sobrenome3', divida: 200, pagoParaTS: 50 },
        { sobrenomes: 'Sobrenome4', divida: 100, pagoParaTS: 30 },
      ],
    },
    // Adicionando mais cinco clientes
    {
      nome: 'Cliente2',
      saldo: 1200,
      detalhes: [
        { sobrenomes: 'Sobrenome5', divida: 400, pagoParaTS: 150 },
        { sobrenomes: 'Sobrenome6', divida: 200, pagoParaTS: 80 },
      ],
    },
    {
      nome: 'Cliente2',
      saldo: 800,
      detalhes: [
        { sobrenomes: 'Sobrenome7', divida: 300, pagoParaTS: 100 },
        { sobrenomes: 'Sobrenome8', divida: 100, pagoParaTS: 50 },
      ],
    },
    {
      nome: 'Cliente3',
      saldo: 2000,
      detalhes: [
        { sobrenomes: 'Sobrenome9', divida: 600, pagoParaTS: 250 },
        { sobrenomes: 'Sobrenome10', divida: 400, pagoParaTS: 120 },
      ],
    },
    {
      nome: 'Cliente3',
      saldo: 1800,
      detalhes: [
        { sobrenomes: 'Sobrenome11', divida: 500, pagoParaTS: 180 },
        { sobrenomes: 'Sobrenome12', divida: 300, pagoParaTS: 120 },
      ],
    },
  ];
  // app.component.ts
  ngOnInit() {
    // Inicialize o nível ao carregar o componente
    this.mudarNivel(this.nivelSelecionado);
  }
  proximonivel() {
    this.nivelSelecionado += 1;
    if (this.nivelSelecionado === 5) {
      this.nivelSelecionado = 1;
    }
    this.mudarNivel(this.nivelSelecionado);
  }

  contarOcorrencias(nome: string): number {
    return this.pessoas.filter((pessoa) => pessoa.nome === nome).length;
  }
  mudarNivel(nivel: number) {
    switch (nivel) {
      case 1:
        this.Agrupado = [
          {
            nome: 'Todos',
            saldo: this.pessoas.reduce(
              (total, cliente) => total + (cliente.saldo || 0),
              0
            ),
            detalhes: [
              {
                sobrenomes: 'Todos',
                divida: this.pessoas.reduce((total, cliente) => {
                  return (
                    total +
                    cliente.detalhes.reduce(
                      (detalheTotal, detalhe) =>
                        detalheTotal + (detalhe.divida || 0),
                      0
                    )
                  );
                }, 0),
                pagoParaTS: this.pessoas.reduce((total, cliente) => {
                  return (
                    total +
                    cliente.detalhes.reduce(
                      (detalheTotal, detalhe) =>
                        detalheTotal + (detalhe.pagoParaTS || 0),
                      0
                    )
                  );
                }, 0),
              },
            ],
          },
        ];
        break;
      case 2:
        this.mapaAgrupado = new Map<string, Cliente[]>();

        this.pessoas.forEach((cliente) => {
          const nomeCliente = cliente.nome;

          if (nomeCliente) {
            if (!this.mapaAgrupado.has(nomeCliente)) {
              this.mapaAgrupado.set(nomeCliente, [cliente]);
            } else {
              this.mapaAgrupado.get(nomeCliente)?.push(cliente); // Usando operador ?. para evitar undefined
            }
          }
        });
        console.log(this.mapaAgrupado);
        this.Agrupado = Array.from(this.mapaAgrupado.values()).map(
          (clientes) => {
            return {
              nome: clientes[0]?.nome,
              saldo: clientes.reduce(
                (total, cliente) => total + (cliente?.saldo || 0),
                0
              ),
              detalhes: [
                {
                  sobrenomes: 'Todos',
                  divida: clientes.reduce((total, cliente) => {
                    return (
                      total +
                      cliente.detalhes.reduce(
                        (detalheTotal, detalhe) =>
                          detalheTotal + (detalhe.divida || 0),
                        0
                      )
                    );
                  }, 0),
                  pagoParaTS: clientes.reduce((total, cliente) => {
                    return (
                      total +
                      cliente.detalhes.reduce(
                        (detalheTotal, detalhe) =>
                          detalheTotal + (detalhe.pagoParaTS || 0),
                        0
                      )
                    );
                  }, 0),
                },
              ],
            };
          }
        );
        break;
      case 3:
      break;
      case 4:
        // Lógica para o Nível 4
        // Implemente a lógica desejada para o Nível 4
        break;
      default:
        this.Agrupado = this.pessoas;
    }
  }
}
type Detalhes = {
  sobrenomes: string;
  divida: number;
  pagoParaTS: number;
};

interface Cliente {
  nome: string;
  saldo: number;
  detalhes: Detalhes[];
}
