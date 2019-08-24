import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./ContactList.module.scss";

function ContactList() {
  let contacts = [
    {
      formattedId: "contacts.email",
      text: "klimenkoiv@yandex.ru",
      isTextLink: true,
      href: "mailto:klimenkoiv@yandex.ru"
    },
    {
      formattedId: "contacts.phone",
      text: "+7 (981) 185 37 51",
      isTextLink: false,
      href: ""
    },
    {
      formattedId: "contacts.github",
      text: "Glacialix",
      isTextLink: true,
      href: "https://github.com/Glacialix"
    },
    {
      formattedId: "contacts.telegram",
      text: "@Glacialix",
      isTextLink: false,
      href: ""
    },
    {
      formattedId: "contacts.vkontakte",
      text: "Иван Клименко",
      isTextLink: true,
      href: "https://vk.com/kleverion"
    }
  ];
  return (
    <div className={styles.contacts}>
      <ul className={styles.contacts_list}>
        {contacts.map((contact, index) => (
          <li className={styles.contacts_item} key={index}>
            <div className={styles.contacts_item_head}>
              <FormattedMessage id={contact.formattedId} />
            </div>
            {contact.isTextLink ? (
              <div className={styles.contacts_item_text}>
                <a
                  className={styles.contacts_item_link}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.text}
                </a>
              </div>
            ) : (
              <div className={styles.contacts_item_text}>{contact.text}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
