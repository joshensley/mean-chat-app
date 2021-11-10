import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexConversationComponent } from './index-conversation.component';

describe('IndexConversationComponent', () => {
  let component: IndexConversationComponent;
  let fixture: ComponentFixture<IndexConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexConversationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
