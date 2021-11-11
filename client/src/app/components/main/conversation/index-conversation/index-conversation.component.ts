import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from 'src/app/services/conversation/conversation.service';

@Component({
  selector: 'app-index-conversation',
  templateUrl: './index-conversation.component.html',
  styleUrls: ['./index-conversation.component.css']
})
export class IndexConversationComponent implements OnInit {
  loading: boolean = true;

  conversation: any = []
  otherUserId: any = "";
  loginUserId: any = "";

  // sending new message
  message: string = "";

  constructor(
    private router: Router,
    private conversationService: ConversationService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const routersplit = this.router.url.split('/');
    this.otherUserId = routersplit.pop();
    this.loginUserId = routersplit.pop();

    this.conversationService.getConversation(this.loginUserId, this.otherUserId)
      .subscribe((conversation) => { 
        this.conversation = conversation
        this.loading = false;
      })

  }

  onSubmit() {

    let date;
    if (this.conversation.messages.length <= 0) {
      date = undefined
    } else {
      date = this.conversation.messages[0].date
    }

    const textMessage = {
      loginUser: this.loginUserId,
      conversation: this.conversation.conversation._id,
      message: this.message,
      lastSentMessageDate: date
    }

    this.conversationService.postMessage(textMessage)
      .subscribe((textMessage) => {
        textMessage.forEach((element: any) => {
          this.conversation.messages.unshift(element);
        });
      });
  }

}
