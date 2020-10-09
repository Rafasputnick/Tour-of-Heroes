import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})

export class MessageService {
  //vetor que guarda as mensagens
  messages : string[] = [];
  //metodo de adicionar mensagem
  add(message: string) {this.messages.push(message);}
  //metodo de excuir o campo de mensagem
  clear() {this.messages = [];}
}