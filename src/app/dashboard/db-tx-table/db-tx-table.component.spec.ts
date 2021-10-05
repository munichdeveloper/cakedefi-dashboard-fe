import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DbTxTableComponent} from './db-tx-table.component';

describe('DbTxTableComponent', () => {
  let component: DbTxTableComponent;
  let fixture: ComponentFixture<DbTxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DbTxTableComponent]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbTxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
