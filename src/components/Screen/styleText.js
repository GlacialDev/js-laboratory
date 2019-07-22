const styleText = `* {
  transition: all 1s;
}

.App {
  width: 100%;
  height: 100%;
  background: rgb(63, 82, 99);
  padding: 10px;
}

.Screen {
  overflow: auto;
  background: rgb(48, 48, 48);
  border: 1px solid #ccc;
  max-height: 44.6%;
  width: 69%;
  font-size: 14px;
  color: white;
  font-family: monospace;
  padding: 10px 10px 20px;
  box-shadow: -4px 4px 2px 0 rgba(0, 0, 0, 0.3);
  white-space: pre-wrap;
  outline: 0;
}

.comment {
  color: #857f6b;
  font-style: italic;
}
.selector {
  color: #e69f0f;
}
.selector .key {
  color: #64d5ea;
}
.key {
  color: #64d5ea;
}
.value {
  color: #be84f2;
}
.value.px {
  color: #f92772;
}
`;

export default styleText;
