<?php

namespace App\Core\Infrastructure\Bus;

use App\Core\Infrastructure\Interaction\SharedQuery\SharedQueryInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\HandledStamp;

readonly class SharedQueryBus implements SharedQueryBusInterface
{
    public function __construct(
        private MessageBusInterface $sharedQueryBus,
    ) {
    }

    public function dispatch(SharedQueryInterface $query, ?StampCollection $stamps = null): mixed
    {
        $envelope = $this->sharedQueryBus->dispatch($query, is_null($stamps) ? [] : $stamps->toArray());

        return $envelope->last(HandledStamp::class)?->getResult();
    }
}
